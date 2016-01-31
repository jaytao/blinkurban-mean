'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String, lowercase: true, maxlength: [128, "Category name cannot exceed {MAXLENGTH} characters"], required: "Category name is required"},
  types: [{ type: String, lowercase: true, maxlength: [128, "Type cannot exceed {MAXLENGTH} characters"]}],
  active: Boolean
});

module.exports = mongoose.model('Category', CategorySchema);