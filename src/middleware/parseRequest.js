import minimist from 'minimist';

export default function parseRequest(req, res, next) {
	const { text } = req.body;

	const args = text.split(' ');
	const argv = minimist(args);

	req.argv = argv;

	next();
}
