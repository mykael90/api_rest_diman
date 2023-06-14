import { Router } from 'express';
import ContractController from '../controllers/ContractController';
import ContractUnidadeController from '../controllers/ContractUnidadeController';

const router = new Router();

const contractUnidadeRoutes = new Router();
router.use('/unidades/', contractUnidadeRoutes);

router.get('/', ContractController.index);
// router.get('/items', WorkerManualfrequencyItemController.index);
router.post('/', ContractController.store);
// router.get('/:id', ContractController.show);

contractUnidadeRoutes.get('/', ContractUnidadeController.index);
contractUnidadeRoutes.post('/', ContractUnidadeController.store);
// contractUnidadeRoutes.put('/', ContractUnidadeController.update);
// contractUnidadeRoutes.delete('/', ContractUnidadeController.delete);

export default router;
