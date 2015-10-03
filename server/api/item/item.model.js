'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  description: String,
  basecost: Number,
  price: Number,
  gender: String,
  categories: Array,
  metrics: [{
    _id: String,
    color: String,
    size: String,
    count: Number 
  }]
});

module.exports = mongoose.model('Item', ItemSchema);
