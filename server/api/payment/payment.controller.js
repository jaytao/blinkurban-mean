'use strict';

var _ = require('lodash');
var stripe = require("stripe")("sk_test_2cYDHK9T3k406IYtF6ilieyq");

exports.payment = function(req, res){
    //stripe.setPublishableKey(pk);
    stripe.tokens.create({
        card: {
            "number": '4242424242424242',
            "exp_month": 12,
            "exp_year": 2017,
            "cvc": '123'
        }
    }, function(error, token) {
        if (error) {return res.status(404)};
        stripe.charges.create({
            amount: 10120, // amount in cents, again
            currency: "usd",
            source: token.id,
            description: "Example charge"
        }, function(err, charge) {
            if (err) {
                return res.status(404);  
            }
            console.log("Hello"); 
            return res.status(200).json(charge);
        });
        console.log("Hello2"); 
        //return res.status(200).json(token);
    });
};

/*

//Real version
//Needs work

exports.payment = function(req, res){
    var stripeToken = req.body.stripeToken;
    var cart = req.body.cart;

    var charge = stripe.charges.create({
        amount: 1000, // amount in cents, again
        currency: "usd",
        source: stripeToken,
        description: "Example charge"
    }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
            // The card has been declined
        }
    });

}


*/
