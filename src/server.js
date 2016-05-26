import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import middleware from './middleware';
import routers from './routers';

const app = express();

/* middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(middleware.authenticateRequest);
app.use(middleware.parseRequest);

/* routes */
app.route('/face')
	.post(middleware.redirectRequest);

app.use(routers.help);
app.use(routers.post);

/* errors */
app.use(middleware.errorHandler);

app.listen(9001);
