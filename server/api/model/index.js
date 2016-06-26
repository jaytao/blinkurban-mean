'use strict';

var express = require('express');
var controller = require('./model.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:name', controller.show);
router.post('/', auth.hasRole('admin'), controller.update);
router.delete('/:name', auth.hasRole('admin'), controller.destroy);

module.exports = router;
