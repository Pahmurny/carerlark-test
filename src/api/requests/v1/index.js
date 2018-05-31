import { Router } from 'express';
import { getRequestFeedbacks, createRequestFeedback, getRequestsList, getRequestDetails, getPendingRequestGivers } from './controller';
import { token } from '../../../services/passport';

const router = new Router();


router.get('/:id/feedbacks', token({ required: true }), getRequestFeedbacks);

router.post('/:id/feedback', token({ required: true }), createRequestFeedback);

router.get('/:id/pending', token({ required: true }), getPendingRequestGivers);

router.get('/:id', token({ required: true }), getRequestDetails);

router.get('/', token({ required: true }), getRequestsList);

export default router;
