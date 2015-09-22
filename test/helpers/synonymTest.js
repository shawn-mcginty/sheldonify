'use strict';

var	assert = require('chai').assert;
var	expect = require('chai').expect;
var	sinon = require('sinon');
var rewire = require('rewire');

var synonymUtils = require('../../src/helpers/synonyms');

describe('synonyms', () => {
	it('is defined', () => {
		assert.isDefined(synonymUtils);
	});

	describe('findLargestSynonym()', () => {
		it('is defined', () => {
			assert.isDefined(synonymUtils.findLargestSynonym);
		});

		it('finds the largest, synonym of the most likely class', () => {
			var expectedResult = 'carry through';
			var actualResult = synonymUtils.findLargestSynonym(mockDictionaryData);

			expect(actualResult).to.equal(expectedResult);
		});
	});
});

var mockDictionaryData = {'noun': {'syn': ['bash','brawl','doh','ut',
'Doctor of Osteopathy','DO','doctor\'s degree','doctorate','party',
'solfa syllable']},
'verb': {'syn': ['make','perform','execute','fare','make out','come',
'get along','cause','practice','practise','exercise','suffice','answer',
'serve','act','behave','manage','dress','arrange','set','coif','coiffe',
'coiffure',
'accomplish','action','carry out','carry through','create','fulfil','fulfill',
'go',
'groom','live up to','locomote','move','neaten','pass','proceed','satisfy',
'spend',
'travel'],'ant': ['unmake'],'rel': ['act up']}};
