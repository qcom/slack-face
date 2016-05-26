import slack from '../../../lib/slack';

export default function postMessage(req, res, next) {
	const { channel_id } = req.body;
	const { face } = req;

	slack.postMessage(channel_id, face)
		.catch(next);

	res.end();
}
