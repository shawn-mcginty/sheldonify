'use strict';

var async = require('async');

var https = require('./helpers/https_wrapper'),
    config = require('./config.json'),
    buildPath = function buildPath(word) {
  return '/api/2/' + config.apiKey + '/' + word + '/json/';
};

module.exports = function (string) {
  var lexors = string.split(' '),
      httpConfig = {
    host: 'words.bighugelabs.com',
    path: '',
    port: 443,
    method: 'GET'
  },
      mappedLexors = lexors.map(function (word) {
    var path = buildPath(word);

    httpConfig.path = path;

    return function (cb) {
      return https(httpConfig, cb);
    };
  });

  async.parallel(mappedLexors, function (data) {
    console.log(data);
  });
};