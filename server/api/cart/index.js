'use strict';

var express = require('express');
var controller = require('./cart.controller');
var auth = require('../../auth/auth.service');   

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router
