'use strict';

var stripe = require("stripe")("sk_test_2cYDHK9T3k406IYtF6ilieyq");
var async = require('async');
var _ = require('lodash');
var Order = require('./order.model');
var Item = require('../item/item.model');
var Cart = require('../cart/cart.model');

// Get list of orders
exports.index = function(req, res) {
  var year = req.headers.year;
  var month = req.headers.month;
  month = month - 1;
  var start = new Date(year,month,1);
  var end = new Date(year,month,31);

  Order.find({orderDate: { $gte: start, $lt: end}})
    .populate("userId", "email -_id")
    .select("-__v")
    .populate("items.itemId", "name price description productImage")
    .sort("-orderDate").exec(function (err, orders) {
        if(err) { return handleError(res, err); }
        if(!orders) { return res.status(404).send('Not Found'); }
        return res.status(200).json(orders);
    });
};

// Get orders for user by id
exports.show = function(req, res) {
  var userId = req.user._id;
  var year = req.headers.year;
  var start = new Date(year, 0, 1);
  var end = new Date(year, 11, 31);  

  Order.find({userId: userId, orderDate: {$gte: start, $lt: end}})
    .select("-userId -__v")
    .populate("items.itemId", "name price description productImage")
    .sort("-orderDate").exec(function (err, order) {
      if(err) { return handleError(res, err); }
      if(!order) { return res.status(404).send('Not Found'); }
      return res.status(200).json(order);
    });
};

exports.updateDelivered = function(req,res) {
    var orderId = req.body.orderId;
    var newStatus = "Delivered";
    Order.findOneAndUpdate({ _id: orderId}, {status: newStatus}, function (err, order){
        if(!order) { return res.status(404).send('Not Found'); }
        return res.status(204).json({}); 
    });
};

exports.updateShipped = function(req,res){
    var orderId = req.body.orderId;
    var newStatus = "Shipped";
    var tracking = req.body.trackingNumber;
    
    Order.findOneAndUpdate({ _id: orderId}, {status: newStatus, trackingNumber: tracking, shippingDate: Date.now()}, function (err, order){
        if(!order) { return res.status(404).send('Not Found'); }
        return res.status(204).json({});
    });

}
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

            newOrder.save(function(err, y){
              if(err) { return handleError(res, err); }
              //clear cart after order
              cart.items = [];
              cart.save(function(err, x){
                if(err) { return handleError(res, err); }
              }); 
            }); 

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
