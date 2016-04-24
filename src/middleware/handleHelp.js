import getHelp from '../lib/getHelp';

export default function handleHelp(req, res, next) {
	const { argv } = req;

	if (!argv.help && !argv.h) return next();

	return getHelp()
		.then(help => res.end(help))
		.catch(next);
}
