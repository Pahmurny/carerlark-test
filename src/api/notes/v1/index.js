import { Router } from 'express';
import { getNoteById, getNotes } from './controller';
import { token } from '../../../services/passport';

const router = new Router();

router.get('/:id', token({ required: true }), getNoteById);

router.post('/', token({ required: true }), getNotes);

export default router;
