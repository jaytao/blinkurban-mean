'use strict';
 
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var textSearch = require('mongoose-text-search')
var Item = require('../item/item.model');

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
        count: Number,
        purchasePrice: Number
    }], 
});

/*
Virtuals
OrderSchema
    .virtual("total")
    .get(function() {
        var total = 0
        var count = 0
        var length = this.items.length 
        this.items.forEach(function(entry) {
            Item.findById(entry.itemId, function (err, item) {
                if (err) return;
                total += (entry.count * item.price)
                count++
                if (count == length) {
                    console.log("I'm here")
                    return total
                }
            });
        });
    });
*/
module.exports = mongoose.model('Order', OrderSchema);
