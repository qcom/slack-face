/* core dependencies */
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';

Promise.promisifyAll(fs);

/* user land dependencies */
import slack from 'slack';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import parseArgs from 'minimist';

dotenv.config();

/* globals */

const app = express();

/* middleware */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function auth(req, res, next) {
	const { token } = req.body;
	if (process.env.FACE_TOKEN === token) return next();
	res.statusCode = 401;
	res.end("bad token");
}

/* helpers */

function getHelp() {
	const dataDir = path.join(__dirname, '..', 'data');
	const helpFilePath = path.join(dataDir, 'help');

	return fs.readFileAsync(helpFilePath, 'utf8');
}

function filterFalsy(obj) {
	return Object.keys(obj)
	.reduce(function(prev, curr) {
		if (obj[curr])
			prev[curr] = obj[curr];
		return prev;
	}, {});
}

function onlyEmojis(obj) {
	return Object.keys(obj)
	.reduce(function(prev, curr) {
		const string = obj[curr];
		if (string[0] === ':' && string[string.length - 1] === ':')
			prev[curr] = string;
		return prev;
	}, {});
}

function renderFace(options) {
	const defaults = {
		eye:	':eye:',
		nose:	':nose::skin-tone-2:',
		mouth:	':lips:'
	};

	const filteredOptions = onlyEmojis(filterFalsy(options));

	const { eye, nose, mouth } = Object.assign(defaults, filteredOptions);

	const padding = '       ';

	let face = `${eye} ${eye}`;
	face += `\n${padding}${nose}`;
	face += `\n${padding}${mouth}`;

	return face;
}

/* routes */

app.route('/face')
	.post(auth)
	.post(function handleFace(req, res, next) {
		const { text } = req.body;

		const args = text.split(' ');
		const argv = parseArgs(args);

		if (argv.help || argv.h) {
			return getHelp().then(function(text) {
				res.end(text);
			}).catch(next);
		}

		const [ eye, nose, mouth ] = argv._;
		const options = { eye, nose, mouth };

		res.end(renderFace(options));
	});

/* error handler */

let banner = '';
for (let i = 0; i < 13; i++) banner += `:dkwhoa:`; // 13 donkeys for good luck

app.use(function handleError(err, req, res, next) {
	console.error(err);

	// delegate to default express error handler if headers have already been sent
	if (res.headersSent) return next(err);

	let message = `${banner}\n`;
	message += `so sorry, something went wrong...working on it!\n`;
	message += `${banner}`;

	res.end(message);
});

app.listen(9001);
