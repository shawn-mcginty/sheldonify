'use strict';

var synonymUntils = {};

synonymUntils.findLargestSynonym = function (dictionaryData) {
	var keys = Object.keys(dictionaryData);
	var mostLikelyClass = { probably: 'noun', count: 0 };
	keys.forEach(function (key) {
		if (dictionaryData[key] && dictionaryData[key].syn) {
			if (mostLikelyClass.count < dictionaryData[key].syn.length) {
				mostLikelyClass.count = dictionaryData[key].syn.length;
				mostLikelyClass.probably = key;
			}
		}
	});

	var synonyms = dictionaryData[mostLikelyClass.probably];
	var largestSynonym = '';

	synonyms.forEach(function (syn) {
		if (syn.length > largestSynonym.length) {
			largestSynonym = syn;
		}
	});

	return largestSynonym;
};

module.exports = synonymUntils;