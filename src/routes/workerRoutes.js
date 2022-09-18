import { Router } from 'express';
import WorkersController from '../controllers/WorkersController';

const router = new Router();

router.get('/', WorkersController.index);
router.post('/', WorkersController.store);

export default router;
