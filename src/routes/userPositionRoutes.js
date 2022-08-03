import { Router } from 'express';
import UserPositionController from '../controllers/UserPositionController';
import UserPositiontypeController from '../controllers/UserPositiontypeController';

const router = new Router();

router.get('/', UserPositionController.index); // listar contratos de usuários
router.post('/', UserPositionController.store); // listar contratos de usuários

router.get('/types', UserPositiontypeController.index); // listar cargos

export default router;
