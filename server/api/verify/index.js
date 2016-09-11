'use strict';

var express = require('express');
var controller = require('./verify.controller');
var auth = require('../../auth/auth.service');   

var router = express.Router();

router.post('/token', controller.verify);
router.get('/send', auth.isAuthenticated(), controller.send);
module.exports = router;
