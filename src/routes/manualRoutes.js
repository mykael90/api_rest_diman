import { Router } from 'express';
import ManualController from '../controllers/ManualController';

const router = new Router();

router.get('/', ManualController.updateBulding2);

export default router;
