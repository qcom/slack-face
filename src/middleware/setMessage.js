import minimist from 'minimist';

import getHelp from '../lib/getHelp';
import renderFace from '../lib/renderFace';

export default function setMessage(req, res, next) {
	const { text } = req.body;

	const args = text.split(' ');
	const argv = minimist(args);

	if (argv.help || argv.h) {
		return getHelp()
			.then(res.end)
			.catch(next);
	}

	const [ eye, nose, mouth ] = argv._;
	const options = { eye, nose, mouth };

	const face = renderFace(options);

	req.face = face;

	next();
}
