const { MarkovMachine } = require('./markov');

let testText =
	'This is a test. A completely random test that has just completey off the rails. Will This work? I have no Idea';

describe('Test Markov', function() {
	test('length isnt longer than numWords limit', function() {
		let mm = new MarkovMachine(testText);
		let output = mm.makeText(10);
		expect(output.split(' ').length).toBeLessThanOrEqual(10);
		output = mm.makeText(50);
		expect(output.split(' ').length).toBeLessThanOrEqual(50);
	});

	test('No Repeated words', function() {
		let mm = new MarkovMachine(testText);
		let output = mm.makeText();
		testArr = output.split(' ');
		for (let i in testArr) {
			expect(testArr[i]).not.toBe(testArr[Number(i) + 1]);
		}
	});
});
