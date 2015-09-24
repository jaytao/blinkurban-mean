'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  cost: Number,
  price: Number
});

module.exports = mongoose.model('Item', ItemSchema);