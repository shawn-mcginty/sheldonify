'use strict';
var async = require('async');

var https = require('./helpers/https_wrapper');
var config = require('./config.json');
var buildPath = function buildPath(word) {
	return '/api/2/' + config.apiKey + '/' + word + '/json/';
};

module.exports = function (string) {
	var lexors = string.split(' ');
	var httpConfig = {
		host: 'words.bighugelabs.com',
		path: '',
		port: 443,
		method: 'GET'
	};
	var mappedLexors = lexors.map(function (word) {
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