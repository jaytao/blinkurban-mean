'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ColorSchema = new Schema({
  colorname: {type: String, required: '{PATH} is required', unique: true},
  colorhex: {type: String, required: '{PATH} is required'}
});

module.exports = mongoose.model('Color', ColorSchema);