var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var Schedule = mongoose.model('Schedule');
var User = mongoose.model('User');

var auth = require('../auth');

router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    var schedule = new Schedule(req.body.schedule);

    schedule.organiser = user;

    return schedule.save().then(function(){
      return res.json({schedule: schedule.toJSONFor(user)});
    });
  }).catch(next);
});


router.get('/', auth.required, function(req, res, next) {

  var query = {};

  Promise.all([
    req.query.organiser ? User.findOne({username: req.query.organiser}) : null
  ]).then(function(results){
    var organiser = results[0];

    if(organiser){
      query.organiser = organiser._id;
    }

    return Promise.all([
      Schedule.find(query).populate('organiser').exec()
    ]).then(function(results){
      var schedules = results[0];

      return res.json({
        schedules: schedules.map(function(schedule){
          return schedule.toJSONFor(organiser);
        })
      });
    });
  }).catch(next);
});

router.get('/:schedule', auth.optional, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.schedule.populate('organiser').execPopulate()
  ]).then(function(results){
    var user = results[0];

    return res.json({schedule: req.schedule.toJSONFor(user)});
  }).catch(next);
});

router.param('schedule', function(req, res, next, slug) {
  Schedule.findOne({ slug: slug})
    .populate('organiser')
    .then(function (schedule) {
      if (!schedule) { return res.sendStatus(404); }

      req.schedule = schedule;

      return next();
    }).catch(next);
});

router.get('/:schedule/sessions', auth.required, function(req, res, next){
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){
    return req.schedule.populate({
      path: 'sessions',
      populate: {
        path: 'organiser'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then(function(article) {
      return res.json({sessions: req.schedule.sessions.map(function(session){
        return session.toJSONFor(user);
      })});
    });
  }).catch(next);

});


router.patch('/:schedule', auth.required, function(req, res, next){
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){

    if(req.body.sessions){

      var existings = Object.assign([], req.schedule.sessions),

        existingsIds = existings.filter(function(value){return value !== null;}).map(function (session) {
          return session.toString();
        });

      req.body.sessions.forEach(function(session){

        if(!existingsIds.includes(session)){
          req.schedule.sessions.push(session);
        }
      });
    }
    return req.schedule.save().then(function(schedule) {
      return res.json({schedule: req.schedule.toJSONFor(user)});
    });
  }).catch(next);

});


module.exports = router;
