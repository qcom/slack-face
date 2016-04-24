const help = `> /face - render emoji faces


\`/face [eye] [nose] [mouth]\`	render face
\`/face --help -h\`	show help`;


export default function handleHelp(req, res, next) {
	const { argv } = req;

	if (!argv.help && !argv.h) return next();

	res.end(help);
}
