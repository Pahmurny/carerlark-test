import { Router } from 'express';
import { create } from './controller';
import { token } from '../../../services/passport';

const router = new Router();

/**
 * @api {post} /companies Create company
    TODO: add apidocs
 */
router.post(
  '/',
  token({ required: true }),
  create,
);

export default router;
