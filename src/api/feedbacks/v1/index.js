import { Router } from 'express';
import { getFeedbackById, patchFeedbackById } from './controller';
import { token } from '../../../services/passport';

const router = new Router();

/**
 * @api {get} /:id Get Feedback details by ID
    TODO: add apidocs
 */
router.get('/:id', token({ required: true }), getFeedbackById);


/**
 * @api {patch} /:id Get Feedback details by ID
    TODO: add apidocs
 */
router.patch('/:id', token({ required: true }), patchFeedbackById);

export default router;
