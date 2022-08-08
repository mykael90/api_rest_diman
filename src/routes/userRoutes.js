import { Router } from 'express';
import userController from '../controllers/UserController';
import userQuerys from '../controllers/UserQuerys';
import userPositionController from '../controllers/UserPositionController';
import userPositiontypeController from '../controllers/UserPositiontypeController';
import userRoleController from '../controllers/UserRoleController';
import userRoletypeController from '../controllers/UserRoletypeController';

const router = new Router();

const positionsRoutes = new Router();
const positionstypeRoutes = new Router();

const rolesRoutes = new Router();
const rolestypeRoutes = new Router();

router.use('/positions/types', positionstypeRoutes);
router.use('/positions/', positionsRoutes);

router.use('/roles/types', rolestypeRoutes);
router.use('/roles/', rolesRoutes);

// USER ROUTES
router.get('/', userController.index); // não precisa listar usuários
router.get('/all', userQuerys.indexAll); // não precisa listar usuários
router.get('/:id?', userController.show);
router.put('/', userController.update);
router.delete('/', userController.delete);

// POSITIONS ROUTES
positionsRoutes.get('/', userPositionController.index);
positionsRoutes.post('/', userPositionController.store);
positionsRoutes.delete('/', userPositionController.delete);

// POSITIONS TYPES ROUTES
positionstypeRoutes.get('/', userPositiontypeController.index);

// ROLES ROUTES
rolesRoutes.get('/', userRoleController.index);
rolesRoutes.post('/', userRoleController.store);
rolesRoutes.delete('/', userRoleController.delete);

// ROLES TYPES ROUTES
rolestypeRoutes.get('/', userRoletypeController.index);

export default router;

// OPENED ROUTE
export const userOpenedRouter = new Router();
userOpenedRouter.post('/', userController.store); // não precisa autenticação
