import renderFace from '../lib/renderFace';

export default function buildFace(req, res, next) {
	const { argv } = req;

	const [ eye, nose, mouth ] = argv._;

	const face = renderFace({ eye, nose, mouth });

	req.face = face;

	next();
}
