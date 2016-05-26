import minimist from 'minimist';

export default function parseRequest(req, res, next) {
	const { text } = req.body;

	const args = text.split(' ');
	const argv = minimist(args);

	const optionShorts = {
		'help': 'h',
		'post': 'p'
	};

	const supportedOptions = Object.keys(optionShorts);

	const calledOptions = supportedOptions.filter(option =>
		option in argv || optionShorts[option] in argv
	);

	/* options cannot currently be used in tandem */
	const primaryOption = calledOptions[0];

	// /face -> /face -p [--post]
	if (!primaryOption) argv.post = argv._;

	// request arguments should only have to be
	// checked on long-name properties on `argv`
	const shortOption = optionShorts[primaryOption];
	const shortOptionArgs = argv[shortOption];

	if (shortOptionArgs && shortOptionArgs.length) {
		argv[primaryOption] = shortOptionArgs;
	}

	req.argv = argv;
	req.primaryOption = primaryOption;

	next();
}
