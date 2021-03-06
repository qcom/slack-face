import renderFace from '../../../lib/renderFace';

export default function buildFace(req, res, next) {
	// 'string' -> ['string'] if only 1 param
	const options = [].concat(req.argv.post);

	let face;

	switch (options.length) {
		case 1: {
			const [ eyes ] = options;
			face = renderFace({ eyes });
			break;
		}
		case 2: {
			const [ leftEye, rightEye ] = options;
			face = renderFace({ leftEye, rightEye });
			break;
		}
		case 3: {
			const [ leftEye, rightEye, nose ] = options;
			face = renderFace({ leftEye, rightEye, nose });
			break;
		}
		case 4: {
			const [ leftEye, rightEye, nose, mouth ] = options;
			face = renderFace({ leftEye, rightEye, nose, mouth });
			break;
		}
		default:
			face = renderFace();
	}

	req.face = face;

	next();
}
