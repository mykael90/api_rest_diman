import { Router } from 'express';
import userController from '../controllers/UserController';
import User_PositionController from '../controllers/User_PositionController';

const router = new Router();

router.get('/', userController.index); // não precisa listar usuários
router.get('/:id?', userController.show);
router.put('/', userController.update);
router.delete('/', userController.delete);

router.get('/positions', User_PositionController.index); // listar contratos de usuários

export default router;

export const userOpenedRouter = new Router();
userOpenedRouter.post('/', userController.store); // não precisa autenticação
