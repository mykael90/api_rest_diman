import { Router } from 'express';

import userController from '../controllers/UserController';
import userQuerys from '../controllers/UserQuerys';

import userPositionController from '../controllers/UserPositionController';
import userPositiontypeController from '../controllers/UserPositiontypeController';

import userThirdController from '../controllers/UserThirdController';
import userThirdtypeController from '../controllers/UserThirdtypeController';

import userRoleController from '../controllers/UserRoleController';
import userRoletypeController from '../controllers/UserRoletypeController';

import userPersonalController from '../controllers/UserPersonalController';

const router = new Router();

const positionsRoutes = new Router();
const positionstypeRoutes = new Router();

const thirdsRoutes = new Router();
const thirdstypeRoutes = new Router();

const rolesRoutes = new Router();
const rolestypeRoutes = new Router();

const personalRoutes = new Router();

router.use('/positions/types', positionstypeRoutes);
router.use('/positions/', positionsRoutes);

router.use('/thirds/types', thirdstypeRoutes);
router.use('/thirds/', thirdsRoutes);

router.use('/roles/types', rolestypeRoutes);
router.use('/roles/', rolesRoutes);

router.use('/personal/', personalRoutes);

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

// THIRDS ROUTES
thirdsRoutes.get('/', userThirdController.index);
thirdsRoutes.post('/', userThirdController.store);
thirdsRoutes.delete('/', userThirdController.delete);

// THIRD TYPES ROUTES
thirdstypeRoutes.get('/', userThirdtypeController.index);

// ROLES ROUTES
rolesRoutes.get('/', userRoleController.index);
rolesRoutes.post('/', userRoleController.store);
rolesRoutes.delete('/', userRoleController.delete);

// ROLES TYPES ROUTES
rolestypeRoutes.get('/', userRoletypeController.index);

// ROLES TYPES ROUTES
personalRoutes.get('/', userPersonalController.index);
personalRoutes.post('/', userPersonalController.store);
personalRoutes.delete('/', userPersonalController.delete);

export default router;

// OPENED ROUTE
export const userOpenedRouter = new Router();
userOpenedRouter.post('/', userController.store); // não precisa autenticação
