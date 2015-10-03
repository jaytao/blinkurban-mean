'use strict';

var _ = require('lodash');
var Order = require('./order.model');

// Get list of orders
exports.index = function(req, res) {
  Order.find(function (err, orders) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(orders);
  });
};

// Get a single order
exports.show = function(req, res) {
  Order.findById(req.params.id, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.status(404).send('Not Found'); }
    console.log("The total for this order is: " + order.total);
    return res.json(order);
  });
};

// Creates a new order in the DB.
exports.create = function(req, res) {
  Order.create(req.body, function(err, order) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(order);
  });
};
