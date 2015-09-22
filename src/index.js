'use strict';
var async = require('async');

var https = require('./helpers/https_wrapper');
var config = require('./config');
var synonymUtils = require('./helpers/synonyms');

var buildPath = (word) => {
	return `/api/2/${config.apiKey}/${word}/json`;
};

var findLargestSynonym = (dictionary) => {
	return null;
};

module.exports = (string, callback) => {
	let words = string.split(' ');
	let lexors = [];
	words.forEach((word, i) => {
		let matchingWords = lexors.filter((lexor) => {
			return lexor === word;
		});

		if (matchingWords.length === 0) {
			lexors.push(word);
		}
	});

	async.map(lexors, (word, cb) => {
		let httpConfig = {
			host: 'words.bighugelabs.com',
			path: buildPath(word),
			port: 443,
			method: 'GET'
		};

		https(httpConfig, (err, data) => {
			if (err) {
				return cb(err);
			}

			let largestSynonym = synonymUtils.findLargestSynonym(data);

			string = string.replace(new RegExp(word, 'g'), largestSynonym);
			cb(null, null);
		});
	}, (err) => {
		if (err) {
			console.log(err);
			return callback(err, null);
		}

		callback(null, string);
	});
};
