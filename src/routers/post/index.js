import express from 'express';
import middleware from './middleware';

const router = express.Router();

router.route('/face/post')
	.post(middleware.buildFace)
	.post(middleware.saveFace)
	.post(middleware.postFace);

export default router;
