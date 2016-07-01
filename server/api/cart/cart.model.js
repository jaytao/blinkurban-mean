'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CartSchema = new Schema({
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
        image: String
    }], 
});

module.exports = mongoose.model('Cart', CartSchema);
