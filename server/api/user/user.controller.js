'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

//mailing stuff
var api_key = 'key-a7ca4294e59fce5f3448ec42cce6979b';
var domain = 'sandboxa2ccce38b5b6439c8d0fde751b3e03cf.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


//var validator = require('validator');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.status(500).send(err);
    res.status(200).json(users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    //TODO send email
    var url = "http://45.55.151.216:9000/"
    var data = {
      from: 'Blink Urban <me@samples.mailgun.org>',
      to: 'blinkurban@gmail.com',
      subject: 'Verify your email address',
      text: 'Please click link',
      html: 'Please click <a href="' + user.verifyToken + '">here</a>'
    };
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    }); 
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
};

/**
 * Update a user profile
 */
exports.updateProfile = function(req, res, next) {
  var userId = req.user._id;

  var firstname = String(req.body.firstname);
  var lastname = String(req.body.lastname);
  var email = String(req.body.email);

  User.findById(userId, function (err, user) {
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.status(200).send('OK');
    });
    
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
