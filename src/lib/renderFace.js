import onlyEmojis from './onlyEmojis';
import filterFalsy from './filterFalsy';

export default function renderFace(options={}) {

	// allow options object to include 'eyes' or 'leftEye' + 'rightEye'
	if (options.eyes) {
		options.leftEye = options.eyes;
		options.rightEye = options.eyes;
	}

	const defaults = {
		leftEye:	':eye:',
		rightEye:	':eye:',
		nose:	':nose::skin-tone-2:',
		mouth:	':lips:'
	};

	const filteredOptions = onlyEmojis(filterFalsy(options));

	const { leftEye, rightEye, nose, mouth } = Object.assign(defaults, filteredOptions);

	const padding = '       ';

	let face = `${leftEye} ${rightEye}`;
	face += `\n${padding}${nose}`;
	face += `\n${padding}${mouth}`;

	return face;

}
