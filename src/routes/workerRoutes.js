import { Router } from 'express';

import UploadController from '../controllers/UploadController';

import WorkerContractController from '../controllers/WorkerContractController';
import WorkersController from '../controllers/WorkersController';

import AddressController from '../controllers/AddressController';
import ContactTypesController from '../controllers/ContactTypesController';
import JobtypeController from '../controllers/WorkerJobtypeController';
import ContractController from '../controllers/ContractController';

import WorkerContractDangerController from '../controllers/WorkerContractDangerController';
import WorkerContractRegimeController from '../controllers/WorkerContractRegimeController';
import WorkerContractUnhealthyController from '../controllers/WorkerContractUnhealthyController';

import { photoMulter } from '../config/multerConfig';

const router = new Router();

const contractRoutes = new Router();

router.use('/contract/', contractRoutes);

router.get('/actives', WorkersController.indexActives);
router.get('/jobtypes', JobtypeController.index);
router.get('/address', AddressController.index);
router.get('/contracts', ContractController.index);
router.get('/contacttypes', ContactTypesController.index);
router.get('/workerscontracts', WorkerContractController.index);

router.get('/', WorkersController.index);
router.post('/', photoMulter, WorkersController.store, UploadController.storeWorker);
router.get('/:id', WorkersController.show);
router.put('/:id', photoMulter, WorkersController.update, UploadController.storeWorker);

// CONTRACT ROUTES
contractRoutes.get('/dangers', WorkerContractDangerController.index);
contractRoutes.get('/regimes', WorkerContractRegimeController.index);
contractRoutes.get('/unhealthies', WorkerContractUnhealthyController.index);

export default router;
