import { Router } from 'express';
import WorkerManualfrequencyController from '../controllers/WorkerManualfrequencyController';

const router = new Router();

// const workerTaskRiskRoutes = new Router();
// router.use('/risks/', workerTaskRiskRoutes);

router.get('/', WorkerManualfrequencyController.index);

// workerTaskRiskRoutes.get('/types', WorkerTaskRisktypeController.index);

export default router;
