'use strict';

var _ = require('lodash');
var User = require('../user/user.model');
var randToken = require('rand-token');
var config = require('../../config/environment');
var mailgun = require('mailgun-js')({apiKey: config.mailgun.api_key, domain: config.mailgun.domain});

exports.verify = function(req, res){
  User.findOne({verifyToken: req.body.token, emailVerified: false}, function(err, user){
    if (err) { return handleError(res,err);}  
    if (!user) {
      return res.status(404).send("Invalid token");
    }
    console.log(user.email);
    if (user.verifyTokenExpiration > Date.now){return res.status(404)}
    user.emailVerified = true;
    user.save(function (err){
      return res.status(200).send("Email verified");
    });   
  });  
}

exports.send = function(req,res){
  var userId = req.user._id;
  User.findById(userId, function (err, user){
    if (err) {handleError(res,err); }
    if (!user) { handleError(res,err); }
    user.verifyToken = randToken.generate(64);
    console.log(user.verifyToken);
    user.verifyTokenExpiration = +new Date() + 6*60*60*1000;
    user.save(function (err){
      sendTokenEmail(user.email, user.verifyToken); 
      return res.status(200);
    });
  });

}

function sendTokenEmail(email,token){
    var url = "http://45.55.151.216:9000/"
    var data = {
      from: 'Blink Urban <me@samples.mailgun.org>',
      to: email,
      subject: 'Verify your email address',
      text: 'Please click link',
      html: 'Please click <a href=http://45.55.151.216:9000/verifytoken?token=' + token + '>here</a>'
    };
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    }); 
}

function handleError(res, err) {
  return res.status(500).send(err);
}
