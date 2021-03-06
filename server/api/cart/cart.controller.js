'use strict';

var _ = require('lodash');
var Cart = require('./cart.model');
var User = require('./cart.model');
var Item = require('../item/item.model');

exports.show = function(req, res) {
    var userId = req.user._id;
    Cart.findOne({'userId': userId}, "items").populate('items.itemId', "name price description productImage").exec(function(err,cart){
        if (err) { return res.status(404).send({message: "Cart not found"})};
        
        return res.status(200).send(cart);
    });
};

exports.update = function(req, res) {
    var userId = req.user._id;
    Cart.findOneAndUpdate({'userId': userId}, req.body, {"upsert":true, "new":true}, function(err,cart){
        if (err) { return handleError(res, err); }
        return res.status(200).send(cart);
    });
};

exports.updateOne = function(req, res) {
    var userId = req.user._id;
    Cart.findOne({'userId': userId},function(err,cart){
        if (err) { return handleError(res,err); }
        if (!cart) {
            var newCart = new Cart({
                userId: userId,
                items: [req.body]
            });
            Cart.create(newCart, function(err, cart) {
                if (err) { return handleError(res,err);} 
                return res.status(200).send(newCart);
            });
        } else {
            cart.items.push(req.body);
            cart.save(function(err){
                if (err) { return handleError(res,err);} 
                return res.status(200).send(cart);
            });
        }
    }); 
};

exports.destroy = function(req, res) {
    var userId = req.user._id;
    
    Cart.findOne({'userId': userId},function(err,cart){
        if (err) { return handleError(res,err); }
        if (cart) {
            cart.items = []
            cart.save(function(err){
                if (err) { return handleError(res,err);} 
                return res.status(200).send({});
            });
        }
    });

};

//handle error
function handleError(res, err) {
  return res.status(500).send(err);
};
