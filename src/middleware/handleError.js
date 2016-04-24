export default function handleError(err, req, res, next) {
	console.error(err);

	// delegate to default express error handler if headers have already been sent
	if (res.headersSent) return next(err);

	const errorMessage = getErrorMessage();

	res.end(errorMessage);
}

function getErrorMessage() {
	let banner = '';
	for (let i = 0; i < 13; i++) banner += `:dkwhoa:`; // 13 donkeys for good luck

	let message = `${banner}\n`;
	message += `so sorry, something went wrong...working on it!\n`;
	message += `${banner}`;

	return message;
}
