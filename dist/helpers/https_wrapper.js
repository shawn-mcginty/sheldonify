'use strict';

var https = require('https');

module.exports = function (connectionOptions, callback) {
  connectionOptions.port = 443;

  var request = https.request(connectionOptions, function (proxyResponse) {
    var responseBody = [],
        addChunk = function addChunk(chunk) {
      responseBody.push(chunk);
    },
        endOfChunking = function endOfChunking() {
      try {
        callback(null, JSON.parse(responseBody));
      } catch (err) {
        console.error('"' + err + '"');
        console.log('The current responseBody prior to erroring was ' + responseBody);
        return callback(err);
      }
    };

    proxyResponse.setEncoding('utf8');

    proxyResponse.on('data', addChunk);

    proxyResponse.on('error', function (err) {
      return callback(err);
    });

    proxyResponse.on('end', endOfChunking);
  });

  request.on('error', function (err) {
    callback(err);
  });

  request.end();
};