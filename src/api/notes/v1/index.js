import { Router } from 'express';
import { getNoteById, getNotes } from './controller';
import { token } from '../../../services/passport';

const router = new Router();

/**
 * @api {get} /:id Get note details by ID
    TODO: UNUSED
 */
router.get('/:id', token({ required: true }), getNoteById);


/**
 * @api {get} /notes Get list of notes
    TODO: UNUSED
 */
router.post('/', token({ required: true }), getNotes);

export default router;
