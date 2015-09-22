'use strict';

var	assert = require('chai').assert;
var	expect = require('chai').expect;
var	sinon = require('sinon');
var rewire = require('rewire');

var sheldonify = rewire('../src/index');

describe('sheldonify', () => {
	it('is defined', () => {
		assert.isDefined(sheldonify);
		assert.isNotNull(sheldonify);
	});

	it('calls https and synonymUtils', (done) => {
		var mockHttps = (foo, cb) => {
			cb(null, mockDictionaryData);
		};

		var mockSynUtils = {findLargestSynonym: () => {}};
		sinon.stub(mockSynUtils, 'findLargestSynonym', (actualDictionaryData) => {
			return 'carry through';
		});

		var testSentence = 'do do do';
		var expectedSentenct = 'carry through carry through carry through';

		sheldonify.__set__('https', mockHttps);
		sheldonify.__set__('synonymUtils', mockSynUtils);

		sheldonify(testSentence, (err, actaulSentence) => {
			expect(err).to.equal(null);
			expect(mockSynUtils.findLargestSynonym.called).to.equal(true);
			expect(actaulSentence).to.equal(expectedSentenct);
			done();
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
