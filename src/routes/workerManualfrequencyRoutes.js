import { Router } from 'express';
import WorkerManualfrequencyController from '../controllers/WorkerManualfrequencyController';
import WorkerManualfrequencyItemController from '../controllers/WorkerManualfrequencyItemController';

const router = new Router();

const workerItemsRoutes = new Router();
router.use('/items/', workerItemsRoutes);

router.get('/', WorkerManualfrequencyController.index);
// router.get('/items', WorkerManualfrequencyItemController.index);
router.post('/', WorkerManualfrequencyController.store);
router.get('/:id', WorkerManualfrequencyController.show);

workerItemsRoutes.get('/', WorkerManualfrequencyItemController.index);
workerItemsRoutes.post('/', WorkerManualfrequencyItemController.store);
workerItemsRoutes.put('/', WorkerManualfrequencyItemController.update);
workerItemsRoutes.delete('/', WorkerManualfrequencyItemController.delete);

export default router;
