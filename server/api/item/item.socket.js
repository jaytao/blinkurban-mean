/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var item = require('./item.model');

exports.register = function(socket) {
  item.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  item.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('item:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('item:remove', doc);
}