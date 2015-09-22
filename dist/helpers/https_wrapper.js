'use strict';
var https = require('https');

module.exports = function (connectionOptions, callback) {
	connectionOptions.port = 443;

	var request = https.request(connectionOptions, function (proxyResponse) {
		var responseBody = '';
		var addChunk = function addChunk(chunk) {
			responseBody += chunk;
		};
		var endOfChunking = function endOfChunking() {
			try {
				callback(null, JSON.parse(responseBody));
			} catch (err) {
				console.error('"' + err + '"');
				console.log('responseBody: ' + responseBody);
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
	request.end();

	request.on('error', function (err) {
		callback(err);
	});
};