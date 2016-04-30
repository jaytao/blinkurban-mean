'use strict';

var _ = require('lodash');
var Cart = require('./cart.model');
var User = require('./cart.model');
var Item = require('../item/item.model');

exports.show = function(req, res) {
    Cart.findOne({'userId': req.params.id}, "items").populate('items.itemId', "-basecost -createdDate -__v").exec(function(err,cart){
        if (err) { return res.status(404).json({})};
        
        return res.status(200).json(cart);
    });
};

exports.update = function(req, res) {
    Cart.findOneAndUpdate({'userId': req.body.userId}, req.body, {"upsert":true, "new":true}, function(err,cart){
        if (err) { return handleError(res, err); }
        return res.status(200).json(cart);
    });
}

//handle error
function handleError(res, err) {
  return res.status(500).send(err);
};
