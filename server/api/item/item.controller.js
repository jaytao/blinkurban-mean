'use strict';

var _ = require('lodash');
var Item = require('./item.model');

// Get list of items
exports.index = function(req, res) {
  Item.find(function (err, items) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(items);
  });
};

// Get a single item
exports.show = function(req, res) {
  Item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.status(404).send('Not Found'); }
    return res.json(item);
  });
};

// Creates a new item in the DB.
exports.create = function(req, res) {
  Item.create(req.body, function(err, item) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(item);
  });
};

// Updates an existing item in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Item.findById(req.params.id, function (err, item) {
    if (err) { return handleError(res, err); }
    if(!item) { return res.status(404).send('Not Found'); }
    var updated = _.merge(item, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(item);
    });
  });
};

// Adds metrics and counts
exports.add = function(req, res) {
  if(req.body._id) { delete req.body._id; }

  Item.findById(req.params.id, function (err, item) {
    if (err) { return handleError(res, err); }
    if (!item) {return res.status(404).send('Not Found'); }
    var sent = false
    var metric = req.body

    //Go through list of metrics and 
    for (var i = 0; i < item.metrics.length; i++) {
      var mColor = item.metrics[i].color
      var mSize = item.metrics[i].size
      if (mColor == metric.color && mSize == metric.size) {
        item.metrics[i].count += metric.count
        item.save(function (err) {
          return res.status(200).json(item);
        });
        sent = true;
        break;
      }
    };
    if (!sent){
      item.metrics.push(metric)
      item.save(function (err) {
        return res.status(200).json(item);
      });
    }
  });
};


// Deletes a item from the DB.
exports.destroy = function(req, res) {
  Item.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.status(404).send('Not Found'); }
    item.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
