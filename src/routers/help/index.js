import express from 'express';
import middleware from './middleware';

const router = express.Router();

router.route('/face/help')
	.post(middleware.displayHelp);

export default router;
