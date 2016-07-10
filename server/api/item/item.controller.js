'use strict';

var _ = require('lodash');
var Item = require('./item.model');

// Get list of items
exports.index = function(req, res) {
  var query = {}
  var limit = 25;
  if (req.headers.category) {
    query.categories = { $elemMatch: { types: searchCategory }};
  }
  if (req.headers.gender) {
    query.gender = req.headers.gender;
  }
  if (req.headers.priceLowerThan && req.headers.priceHigherThan){
    query.price = { $gte : req.headers.priceHigherThan, $lte : req.headers.priceLowerThan};
  } else if (req.headers.priceLowerThan){
    query.price = { $lte: req.headers.priceLowerThan };
  } else if (req.headers.priceHigherThan){
    query.price = { $gte: req.headers.priceHigherThan };
  }
  
  var finder = Item.find(query);
  
  if (req.headers.latest != null && req.headers.latest) {
    finder.sort("-createdDate"); 
  }
  if (req.headers.limit) {
    finder.limit(req.headers.limit);
  }
  if (req.originalUrl == "/api/items/admin"){
    finder.populate('metrics.colorId').select('-__v').exec(function (err, items) {
      if (err) { return handleError(res, err); }
      if (!items) {return res.status(404).send("No items match")};
      return res.status(200).json(items)
    });
  } else {
    finder.populate('metrics.colorId').select('-basecost -__v').exec(function (err, items) {
      if (err) { return handleError(res, err); }
      if (!items) {return res.status(404).send("No items match")};
      return res.status(200).json(items)
    }); 
  }
};

// Get a single item
exports.show = function(req, res) {
  Item.findById(req.params.id, '-basecost')
  .populate('metrics.colorId')
  .exec(function (err, item) {
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
    updated.metrics = req.body.metrics
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
    var metric = req.body
    var mKey = metric.color.toLowerCase() + "_" + metric.size.toLowerCase()
    
    if (item.metrics.id(mKey)) {
      var dbMetric = item.metrics.id(mKey)
      dbMetric.count += metric.count
      item.save(function (err) {
        return res.status(200).json(item);
      });
    }
    else { 
      metric._id = mKey
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
      return res.status(204).send('Item Removed');
    });
  });
};


// Search functionality
exports.search = function(req, res){
    Item.find(
        { $text : { $search : req.query.field } },
        { score : { $meta: "textScore" } }
    )
    .sort({ score : { $meta : 'textScore' } })
    .exec(function(err, results) {
        return res.status(200).json(results)
    });
};

//more directed pulling of items based on category
exports.get = function(req, res){
    var searchCategory = req.query.category.toLowerCase();
    Item.find ({categories: { $elemMatch: { types: searchCategory} } }, function (err, docs) {
        if(docs.length == 0) { return res.status(404).send('Not Found'); }
        return res.status(200).json(docs); 
    });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
