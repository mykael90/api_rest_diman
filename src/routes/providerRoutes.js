import { Router } from 'express';
import providerController from '../controllers/ProviderController';

const router = new Router();

router.get('/', providerController.index);
router.post('/', providerController.store);
// router.get('/:id', alunoController.show);
// router.put('/:id', alunoController.update);
// router.delete('/:id', alunoController.delete);

export default router;
