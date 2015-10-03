'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  description: String,
  basecost: Number,
  price: Number,
  metrics: [{
    color: String,
    size: String,
    count: Number 
  }]
});

module.exports = mongoose.model('Item', ItemSchema);
