'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ColorSchema = new Schema({
  colorname: String,
  colorhex: String
});

module.exports = mongoose.model('Color', ColorSchema);