import Promise from 'bluebird';
import slack from 'slack';

const postMessageApi = Promise.promisify(slack.chat.postMessage);

export function postMessage(channel, text) {
	const { SLACK_TOKEN } = process.env;

	return postMessageApi({
		channel,
		text,
		as_user: false,
		token: SLACK_TOKEN
	});
}

export default {
	postMessage
};
