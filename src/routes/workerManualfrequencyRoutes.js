import { Router } from 'express';
import WorkerManualfrequencyController from '../controllers/WorkerManualfrequencyController';
import WorkerManualfrequencyItemController from '../controllers/WorkerManualfrequencyItemController';

const router = new Router();

// const workerTaskRiskRoutes = new Router();
// router.use('/risks/', workerTaskRiskRoutes);

router.get('/', WorkerManualfrequencyController.index);
router.post('/', WorkerManualfrequencyController.store);

router.get('/items', WorkerManualfrequencyItemController.index);

// workerTaskRiskRoutes.get('/types', WorkerTaskRisktypeController.index);

export default router;
