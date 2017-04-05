var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Session = mongoose.model('Session');
var User = mongoose.model('User');
var jwt = require('jsonwebtoken');

var auth = require('../auth');

router.post('/', auth.required, function(req, res, next) {

  var token = jwt.decode(auth.getTokenFromHeader(req));

  return User.findOne({email: token.email}).then(function(user){

    if (!user) { return res.sendStatus(401); }

    var session = new Session(req.body.session);

    session.organiser = user;
    session.members.push(user);

    return session.save().then(function(){

      user.sessions.push(session);
      user.save();

      return res.json({session: session.toJSONForCreation()});
    });
  }).catch(next);
});

router.get('/', auth.required, function(req, res){

  var token = jwt.decode(auth.getTokenFromHeader(req));

  return User.findOne({email: token.email}).then(function(user){
    if(user){
      return Session.find({organiser: user}).populate('organiser').populate({
        path: 'members',
        model: 'User'
      }).exec(function(err, sessions) {
        return res.json({
          sessions: sessions.map(function(session){
            return session.toJSONForDetails();
          })
        })
      });
    }
  });
});

router.param('session', function(req, res, next, slug) {
  Session.findOne({ slug: slug})
          .populate('organiser')
          .populate({
              path: 'members',
              model: 'User'
            })
          .exec(function (err, session) {
            if (!session) { return res.sendStatus(404); }

            req.sessionObj = session;

            return next();
          }).catch(next);
});

router.get('/:session', auth.required, function(req, res) {
  if(req.sessionObj){
    return res.json({"session": req.sessionObj.toJSONForDetails()});
  }else{
    return res.json({"session:":[]});
  }
});

router.patch('/:session', auth.required, function(req, res) {
  if(req.sessionObj){

    User.findOne({email: req.body.member.email}).then(function(user){

      if(user){

        Session.findOneAndUpdate({"_id": req.sessionObj, "members": {$ne: user}}, {"$push": {"members": user}}, {new:true})
          .populate('organiser')
          .populate({path: 'members', model: 'User'})
          .exec(function(err, session){
            return res.json({"session": session.toJSONForDetails()});
          });
      }
    });
  }else{
    return res.json({"session:":[]});
  }
});


module.exports = router;
