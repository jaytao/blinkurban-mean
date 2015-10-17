'use strict';

var express = require('express');
var controller = require('./item.controller');

var router = express.Router();

router.get("/search", controller.search);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/:id/add', controller.add);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
