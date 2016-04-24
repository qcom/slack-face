import onlyEmojis from './onlyEmojis';
import filterFalsy from './filterFalsy';

export default function renderFace(options) {
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
