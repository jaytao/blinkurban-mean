'use strict';

var stripe = require("stripe")("sk_test_2cYDHK9T3k406IYtF6ilieyq");
var async = require('async');
var _ = require('lodash');
var Order = require('./order.model');
var Item = require('../item/item.model');
var Cart = require('../cart/cart.model');

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
    return res.json(order);
  });
};

// Creates a new order in the DB.
exports.create = function(req, res) {

  //TODO - Query db to see if all the items and metrics are still available
  //       and if so, decrement the count in those metrics 
    
  Cart.findOne({'userId': req.body.userId}, 'items', function(err, cart){
    console.log(cart.items);
    var total = 0
    if(err) { return handleError(res, err); }
    async.each(cart.items, function(item, callback){
        Item.findById(item.itemId, function (err, i) {
            total = total + (i.price * item.count);
            console.log("Total: " + total);
            callback();
        });
    },
    function(error) {
      if (total > 0) {
          chargeStripe(total);
      } else {
        return res.status(500).send(err);
      }
      return res.status(201).json({total: total});
    });
  });
}

var chargeStripe = function(amount){
    stripe.tokens.create({
        card: {
            "number": '4242424242424242',
            "exp_month": 12,
            "exp_year": 2017,
            "cvc": '123'
        }
    }, function(error, token) {
        if (error) {return res.status(404)};
        var cents = amount * 100
        stripe.charges.create({
            amount: cents, // amount in cents, again
            currency: "usd",
            source: token.id,
            description: "Example charge"
        }, function(err, charge) {
            if (err) {
                console.log("ERROR: " + err)
            } else {
                console.log("Strip Charged $" + amount.toFixed(2))
            }
        });
    });
};



//remove order
exports.destroy = function(req, res) {
  Order.findById(req.params.id, function (err, order) {
    if (err) { return handleError(res,err); }
    if (!order) { return res.status(404).send("Not Found"); }
    order.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send("Order Deleted");
    });
  });
};

//handle error
function handleError(res, err) {
  return res.status(500).send(err);
};
