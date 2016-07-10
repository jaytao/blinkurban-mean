'use strict';

var express = require('express');
var controller = require('./item.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get("/search", controller.search);
router.get("/get", controller.get);
router.get('/', controller.index);
router.get('/admin', auth.hasRole('admim'), controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.post('/:id/add', auth.hasRole('admin'), controller.add);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
