var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
var auth = require('../auth');
var request = require("request");
var jwt = require('jsonwebtoken');

router.post('/signup', function(req, res, next){

  var email = req.body.user.email,
      password = req.body.user.password,
      firstName = req.body.user.firstName,
      lastName = req.body.user.lastName;

  var signupOptions = { method: 'POST',
    url: 'https://dreamingmonkey.au.auth0.com/dbconnections/signup',
    headers: { 'content-type': 'application/json' },
    body:
      { client_id: 'TbHzK1zgP9mMH8qvoEWCN87HglMeZNxp',
        email: email,
        password: password,
        connection: 'Username-Password-Authentication',
        user_metadata: { firstName: firstName, lastName: lastName } },
    json: true };

  var loginOptions = {
    method: 'POST',
    url: 'https://dreamingmonkey.au.auth0.com/oauth/ro',
    headers: { 'content-type': 'application/json' },
    body: {
      client_id: 'TbHzK1zgP9mMH8qvoEWCN87HglMeZNxp',
      username: email,
      password: password,
      connection: 'Username-Password-Authentication',
      scope: 'openid profile'
    },
    json: true
  };

  return request(signupOptions, function (error, response, body) {

    if (200 === response.statusCode){

      var user = new User();
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;

      return request(loginOptions, function (error, response, body) {

        if (200 === response.statusCode) {

          var token = jwt.decode(body.id_token);
          user.picture = token.picture;

          user.save().then(function(){
            return res.json({user: user.toAuthJSON(body.id_token)});
          }).catch(next);
        }else{
          return res.sendStatus(401);
        }
      });
    }else{
      if(400 === response.statusCode){
        return res.json(body);
      }else {
        return res.sendStatus(401);
      }
    }
  });
});

router.get('/current', auth.required, function(req, res, next){

  var token = jwt.decode(auth.getTokenFromHeader(req));

  return User.findOne({email: token.email}).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON(auth.getTokenFromHeader(req))});
  }).catch(next);
});

router.post('/login', function(req, res, next){
  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }


  var loginOptions = {
    method: 'POST',
    url: 'https://dreamingmonkey.au.auth0.com/oauth/ro',
    headers: { 'content-type': 'application/json' },
    body: {
      client_id: 'TbHzK1zgP9mMH8qvoEWCN87HglMeZNxp',
      username: req.body.user.email,
      password: req.body.user.password,
      connection: 'Username-Password-Authentication',
      scope: 'openid email'
    },
    json: true
  };

  return request(loginOptions, function (error, response, body) {
    if (200 === response.statusCode) {
      User.findOne({email: req.body.user.email}).then(function(user){
        return res.json({user: user.toAuthJSON(body.id_token)});
      }).catch(next);
    }else{
      return res.sendStatus(401);
    }
  });
});

router.get('/', auth.required, function(req, res){

  if(req.query.q) {

    return User.find({email: new RegExp(req.query.q, 'i')}).then(function (users) {
      return res.json({
        users: users.map(function (user) {
          return user.toProfileJSON();
        })
      })
    });
  }else{
    return res.json({users: []});
  }
});

router.patch('/', auth.required, function(req, res, next){

  var token = jwt.decode(auth.getTokenFromHeader(req));

  return User.findOne({email: token.email}).then(function (user) {

    Object.assign(user, req.body.user);

    user.save().then(function(updated){
      return res.json({user: updated.toProfileJSON()});
    });
  });
});

module.exports = router;
