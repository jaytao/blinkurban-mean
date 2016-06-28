'use strict';

var express = require('express');
var controller = require('./order.controller');
var auth = require('../../auth/auth.service');   

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.show);
router.get('/all', auth.hasRole('admin'), controller.index);
router.post('/updateShipped', auth.hasRole('admin'), controller.updateShipped);
router.post('/updateDelivered', auth.isAuthenticated(), controller.updateDelivered);
router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router
