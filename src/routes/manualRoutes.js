import { Router } from 'express';
import ManualController from '../controllers/ManualController';

const router = new Router();

router.get('/', ManualController.update);

export default router;
