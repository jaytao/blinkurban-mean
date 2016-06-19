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

// Get orders for user by id
exports.show = function(req, res) {
  Order.find({userId: req.params.id}, function (err, order) {
    if(err) { return handleError(res, err); }
    if(!order) { return res.status(404).send('Not Found'); }
    return res.json(order);
  });
};

// Creates a new order in the DB.
// 1) Find cart for user
// 2) Calculate total
// 3) Make new order object
// 4) Clear old cart
// 5) Charge stripe
exports.create = function(req, res) {

  //TODO - Query db to see if all the items and metrics are still available
  //       and if so, decrement the count in those metrics 
  var userId = req.user._id;
  var shippingAddress = {
    street: req.body.args.shipping_address_line1,
    state: req.body.args.shipping_address_state,
    city: req.body.args.shipping_address_city,
    zip: req.body.args.shipping_address_zip,
    country: req.body.args.shipping_address_country_code
  };
  var tokenId = req.body.token.id
  Cart.findOne({'userId': userId}, 'items', function(err, cart){
    var total = 0;
    if(err) { return handleError(res, err); }
    async.each(cart.items, function(item, callback){
      Item.findById(item.itemId, function (err, i) {
        total = total + (i.price * item.count);
        console.log("Total: " + total);
        callback();
      });
    },
    function(error) {
      if(error) { return handleError(res, err); }

      var newOrder = new Order({
        userId: userId,
        total: total,
        items: cart.items,
        shippingAddress: shippingAddress
      });

      newOrder.save(function(err, y){
        if(err) { return handleError(res, err); }
          //clear cart after order
          cart.items = [];
          cart.save(function(err, x){
            if(err) { return handleError(res, err); }
          }); 
      }); 

      if (total > 0) {
        stripe.charges.create({
          amount: total*100, // amount in cents, again
          currency: "usd",
          source: tokenId,
          description: "Bl.Ur"
        }, function(err, charge) {
          if (err) {
            handleError(res,err);
          } else {
            return res.status(200).send({id: newOrder._id});
          }
        });
      } else {
        return res.status(500).send(err);
      }
    });
  });
}

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
  console.log(err);
  return res.status(500).send(err);
};
