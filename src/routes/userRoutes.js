import { Router } from 'express';
import userController from '../controllers/UserController';

const router = new Router();

router.get('/', userController.index); // não precisa listar usuários
router.get('/:id', userController.show);
router.put('/', userController.update);
router.delete('/', userController.delete);

export default router;

export const userOpenedRouter = new Router();
userOpenedRouter.post('/', userController.store); // não precisa autenticação
