export default function redirectRequest(req, res) {
	const { primaryOption } = req;

	// /face -> /face -p [--post]
	if (!primaryOption) return res.redirect(307, '/face/post');

	res.redirect(307, `/face/${primaryOption}`);
}
