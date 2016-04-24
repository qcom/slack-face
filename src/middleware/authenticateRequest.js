export default function authenticateRequest(req, res, next) {
	const { FACE_TOKEN } = process.env;
	const requestToken = req.body.token;

	if (FACE_TOKEN === requestToken) return next();

	res.statusCode = 401;
	res.end("bad token");
}
