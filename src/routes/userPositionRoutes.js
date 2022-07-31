import { Router } from 'express';
import User_PositionController from '../controllers/User_PositionController';

const router = new Router();

router.get('/', User_PositionController.index); // listar contratos de usuários
router.post('/', User_PositionController.store); // listar contratos de usuários

export default router;
