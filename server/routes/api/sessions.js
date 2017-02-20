var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Session = mongoose.model('Session');
var User = mongoose.model('User');

var auth = require('../auth');

router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    var session = new Session(req.body.session);

    session.organiser = user;

    return session.save().then(function(){
      return res.json({session: session.toJSONFor(user)});
    });
  }).catch(next);
});

module.exports = router;
