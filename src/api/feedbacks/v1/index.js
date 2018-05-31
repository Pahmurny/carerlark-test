import { Router } from 'express';
import { getFeedbackById, patchFeedbackById } from './controller';
import { token } from '../../../services/passport';

const router = new Router();

/**
  TODO: add apidocs
*/

router.get('/:id', token({ required: false }), getFeedbackById);

router.patch('/:id', token({ required: false }), patchFeedbackById);

export default router;
