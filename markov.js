const fs = require('fs');

/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// TODO
		let words = this.words;
		let chain = {};
		for (let i in words) {
			if (words[i] in chain) {
				chain[words[i]].push(words[Number(i) + 1] || null);
			} else {
				chain[words[i]] = [ words[Number(i) + 1] || null ];
			}
		}

		this.chain = chain;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		// TODO

		let chain = this.chain;
		let keys = Object.keys(chain);
		let poem = [];
		let first = keys[Math.floor(Math.random() * keys.length)];
		poem.push(first);
		let timer = true;
		let x = 0;
		let maxwords = numWords;
		while (timer == true) {
			if (x > maxwords - 2) {
				break;
			}
			let curr = poem[x];

			let nextArr = chain[curr];

			let nextWord;
			if (nextArr.length > 1) {
				nextWord = nextArr[Math.floor(Math.random() * nextArr.length)];
			} else {
				nextWord = nextArr[0];
			}

			if (nextWord == null) {
				break;
			} else {
				poem.push(nextWord);
				x += 1;
			}
		}

		return poem.join(' ');
	}
}

//
// let mm = new MarkovMachine('the cat in the hat jumped fast over the beans');
// mm.makeText(20);

module.exports = {
	MarkovMachine
};
