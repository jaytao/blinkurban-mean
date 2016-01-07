'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var category = require('../category/category.model');

var ItemSchema = new Schema({
  name: String,
  description: String,
  basecost: Number,
  price: Number,
  gender: String,
  categories: [category],
  materials: Array,
  createdDate: { type: Date, default : Date.now },
  metrics: [{
    _id: String,
    colorId: { type: Schema.Types.ObjectId, ref: 'Color' },
    size: String,
    count: Number 
  }]
});
ItemSchema.index({ name : 'text', categories: 'text', description : 'text' },
                 { weights: {name: 10, categories: 5, description: 3}, name: "textScore"});

module.exports = mongoose.model('Item', ItemSchema);
