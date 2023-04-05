import { Router } from 'express';
import WorkerTaskController from '../controllers/WorkerTaskController';

const router = new Router();

router.get('/', WorkerTaskController.index);

export default router;
