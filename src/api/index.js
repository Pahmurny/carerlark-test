import { Router } from 'express';
import authRoutesV1 from './auth/v1';
import usersRoutesV1 from './users/v1';
import companiesRoutesV1 from './companies/v1';
import requestsRoutesV1 from './requests/v1';
import feedbacksRoutesV1 from './feedbacks/v1';
import notesRoutesV1 from './notes/v1';

const router = new Router();

router.use('/v1/auth', authRoutesV1);
router.use('/v1/users', usersRoutesV1);
router.use('/v1/companies', companiesRoutesV1);
router.use('/v1/requests', requestsRoutesV1);
router.use('/v1/feedbacks', feedbacksRoutesV1);
router.use('/v1/notes', notesRoutesV1);

export default router;
