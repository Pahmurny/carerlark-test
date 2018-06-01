import { Router } from 'express';
import { create } from './controller';
import { token } from '../../../services/passport';

const router = new Router();

router.post(
  '/',
  token({ required: true }),
  create,
);

export default router;
