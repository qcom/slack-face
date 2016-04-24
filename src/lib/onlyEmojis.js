export default function onlyEmojis(obj) {
	return Object.keys(obj)
	.reduce(function(prev, curr) {
		const string = obj[curr];
		if (string[0] === ':' && string[string.length - 1] === ':')
			prev[curr] = string;
		return prev;
	}, {});
}
