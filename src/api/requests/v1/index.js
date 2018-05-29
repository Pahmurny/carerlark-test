import { Router } from 'express';
import { getRequestFeedbacks, createRequestFeedback } from './controller';
import { token } from '../../../services/passport';

const router = new Router();


router.get('/:id/feedbacks', token({ required: true }), getRequestFeedbacks);


router.post('/:id/feedback', token({ required: true }), createRequestFeedback);

export default router;
