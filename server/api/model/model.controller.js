'use strict';

var _ = require('lodash');
var Model = require('./model.model');

// Get list of models
exports.index = function(req, res) {
  Model.find().select("name -_id").exec(function(err, models) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(models);
  });
};

// Get a single model
exports.show = function(req, res) {
  Model.findOne({name: req.params.name}).select("-_id -__v").exec(function (err, model) {
    if(err) { return handleError(res, err); }
    if(!model) { return res.status(404).send('Not Found'); }
    return res.json(model);
  });
};

// Updates an existing model in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id;}
  req.body.name = req.body.name.toLowerCase();
  Model.findOneAndUpdate({name: req.body.name}, req.body, {"upsert":true, "new":true}, function(err,model){
    if (err) { return handleError(res,err);}
    return res.status(200).json(model);  
  }); 
};

// Deletes a model from the DB.
exports.destroy = function(req, res) {
  Model.findOne({name: req.params.name}, function (err, model) {
    if(err) { return handleError(res, err); }
    if(!model) { return res.status(404).send('Not Found'); }
    model.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
