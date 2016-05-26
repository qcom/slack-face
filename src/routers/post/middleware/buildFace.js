import renderFace from '../../../lib/renderFace';

export default function buildFace(req, res, next) {
	const options = req.argv.post;

	// 'string' -> ['string'] if only 1 param
	const [ eye, nose, mouth ] = [].concat(options);

	const face = renderFace({ eye, nose, mouth });

	req.face = face;

	next();
}
