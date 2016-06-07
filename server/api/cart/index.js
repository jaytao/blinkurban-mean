'use strict';

var express = require('express');
var controller = require('./cart.controller');
var auth = require('../../auth/auth.service');   

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.update);
router.put('/', auth.isAuthenticated(), controller.updateOne);
router.delete('/', auth.isAuthenticated(), controller.destroy);

module.exports = router
