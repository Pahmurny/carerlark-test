import { Router } from 'express';
import { showMe, create, getDetails, getFeedbacks, getRequests, createRequest, getAllUsers } from './controller';
import { token } from '../../../services/passport';

const router = new Router();

/* TODO: apidocs */

router.get('/me', token({ required: true }), showMe);

router.get('/:id/feedbacks', token({ required: false }), getFeedbacks);

router.get('/:id/requests', token({ required: false }), getRequests);

router.post('/:id/request', token({ required: true }), createRequest);

router.get('/:id', token({ required: false }), getDetails);

router.get('/', token({ required: false }), getAllUsers);

router.post('/', create);

export default router;
