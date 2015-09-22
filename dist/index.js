'use strict';
var async = require('async');

var https = require('./helpers/https_wrapper');
var config = require('./config');
var buildPath = function buildPath(word) {
	return '/api/2/' + config.apiKey + '/' + word + '/json';
};

var findLargestSynonym = function findLargestSynonym(dictionary) {
	return null;
};

module.exports = function (string, callback) {
	var words = string.split(' ');
	var lexors = [];
	words.forEach(function (word, i) {
		var matchingWords = lexors.filter(function (lexor) {
			return lexor === word;
		});

		if (matchingWords.length === 0) {
			lexors.push(word);
		}
	});

	async.map(lexors, function (word, cb) {
		var httpConfig = {
			host: 'words.bighugelabs.com',
			path: buildPath(word),
			port: 443,
			method: 'GET'
		};

		https(httpConfig, function (err, data) {
			if (err) {
				return cb(err);
			}

			var largestSynonym = findLargestSynonym(data);

			string.replace(word, largestSynonym);
			callback(null, null);
		});
	}, function (err) {
		if (err) {
			console.log(err);
			return callback(err, null);
		}

		callback(null, string);
	});
};