import { Router } from 'express';
import WorkersContactController from '../controllers/WorkersContactController';
import WorkersController from '../controllers/WorkersController';

const router = new Router();
const inRoutes = new Router();

router.get('/', WorkersController.index);
router.post('/', WorkersController.store);

export default router;
