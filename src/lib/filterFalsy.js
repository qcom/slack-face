export default function filterFalsy(obj) {
	return Object.keys(obj)
	.reduce(function(prev, curr) {
		if (obj[curr])
			prev[curr] = obj[curr];
		return prev;
	}, {});
}
