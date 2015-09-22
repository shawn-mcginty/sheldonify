'use strict';
var async = require('async');

var https = require('./helpers/https_wrapper');
var config = require('./config.json');
var buildPath = (word) => {
	return `/api/2/${config.apiKey}/${word}/json/`;
};

module.exports = (string) => {
	let lexors = string.split(' ');
	let httpConfig = {
		host: 'words.bighugelabs.com',
		path: '',
		port: 443,
		method: 'GET'
	};
	let mappedLexors = lexors.map((word) => {
		let path = buildPath(word);

		httpConfig.path = path;

		return (function(cb) {
			return https(httpConfig, cb);
		});
	});

	async.parallel(mappedLexors, (data) => {
		console.log(data);
	});
};
