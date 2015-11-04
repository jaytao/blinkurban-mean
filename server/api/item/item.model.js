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
  materials: Array,
  metrics: [{
    _id: String,
    colorname: String,
    colorhex: String,
    size: String,
    count: Number 
  }]
});
ItemSchema.index({ name : 'text', categories: 'text', description : 'text' },
                 { weights: {name: 10, categories: 5, description: 3}, name: "textScore"});
module.exports = mongoose.model('Item', ItemSchema);
