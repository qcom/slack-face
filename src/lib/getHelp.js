import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';

Promise.promisifyAll(fs);

export default function getHelp() {
	const dataDir = path.join(__dirname, '..', 'data');
	const helpFilePath = path.join(dataDir, 'help');

	return fs.readFileAsync(helpFilePath, 'utf8');
}
