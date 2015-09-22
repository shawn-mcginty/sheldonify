'use strict';

var synonymUntils = {};

synonymUntils.findLargestSynonym = (dictionaryData) => {
	var keys = Object.keys(dictionaryData);
	var mostLikelyClass = {probably: 'noun', count: 0};
	keys.forEach((key) => {
		if (dictionaryData[key] && dictionaryData[key].syn) {
			if (mostLikelyClass.count < dictionaryData[key].syn.length) {
				mostLikelyClass.count = dictionaryData[key].syn.length;
				mostLikelyClass.probably = key;
			}
		}
	});

	var synonyms = dictionaryData[mostLikelyClass.probably].syn;
	var largestSynonym = '';

	synonyms.forEach((syn) => {
		if (syn.length > largestSynonym.length) {
			largestSynonym = syn;
		}
	});

	return largestSynonym;
};

module.exports = synonymUntils;
