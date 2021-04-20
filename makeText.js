/** Command-line tool to generate Markov text. */

const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');
const { htmlToText } = require('html-to-text');

function generateText(text, limit) {
	let mm = new markov.MarkovMachine(text);
	console.log(mm.makeText(limit));
}

function makeText(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log('Ya blew it...ERROR', err);
			process.kill(1);
		} else {
			generateText(data);
		}
	});
}

async function makeURLText(url) {
	let res;

	try {
		res = await axios.get(url);
	} catch (e) {
		console.log('bad URL', e);
		process.exit(1);
	}
	pureText = htmlToText(res.data);

	generateText(pureText);
}

// let txt =
// 	'Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen';
// generateText(txt, 50);

let [ method, path ] = process.argv.slice(2);

if (method === 'file') {
	makeText(path);
} else if (method === 'url') {
	makeURLText(path);
} else {
	console.error(`Unknown method: ${method}`);
	process.exit(1);
}
