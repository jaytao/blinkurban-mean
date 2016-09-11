'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/blinkurban-dev'
  },

  seedDB: false,

  mailgun: {
    domain: 'sandboxa2ccce38b5b6439c8d0fde751b3e03cf.mailgun.org',
    api_key: 'key-a7ca4294e59fce5f3448ec42cce6979b'
  }
};
