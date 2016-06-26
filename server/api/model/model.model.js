'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ModelSchema = new Schema({
  name: { type: String, unique: true, required: true},
  height: Number,
  weight: Number,
  coverPhoto: String,
  shirtSize: String,
  description: String
});

module.exports = mongoose.model('Model', ModelSchema);
