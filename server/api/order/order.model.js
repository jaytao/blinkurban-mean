'use strict';
 
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var Item = require('../item/item.model');

var opts = {};
opts.toJSON = { virtuals: true };

var OrderSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User"
    },
    items: [{
        itemId: {
            type: ObjectId,
            ref: "Item",
        },
        size: String,
        colorname: String,
        count: Number,
        purchasePrice: Number
    }], 
}, opts);

//Virtuals
OrderSchema
    .virtual("total")
    .get(function() {
        var total = 0;
        var count = 0;
        this.items.forEach(function(entry) {
            total += (entry.purchasePrice*entry.count);
        });
        return total;
    });

module.exports = mongoose.model('Order', OrderSchema);
