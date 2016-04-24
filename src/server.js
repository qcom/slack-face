import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import middleware from './middleware';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.route('/face')
	.post(middleware.authenticateRequest)
	.post(middleware.parseRequest)
	.post(middleware.handleHelp)
	.post(middleware.buildFace)
	.post(middleware.postFace);

app.use(middleware.handleError);

app.listen(9001);
