'use strict';

var express = require('express');
var controller = require('./cart.controller');

var router = express.Router();

router.get('/:id', controller.show);
router.post('/', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router
