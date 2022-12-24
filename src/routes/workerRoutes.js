import { Router } from 'express';

import UploadController from '../controllers/UploadController';

import WorkerContractController from '../controllers/WorkerContractController';
import WorkersController from '../controllers/WorkersController';

import AddressController from '../controllers/AddressController';
import ContactTypesController from '../controllers/ContactTypesController';
import JobtypeController from '../controllers/WorkerJobtypeController';
import ContractController from '../controllers/ContractController';

import { photoMulter } from '../config/multerConfig';

const router = new Router();
const inRoutes = new Router();

router.use('/', inRoutes);

router.get('/actives', WorkersController.indexActives);
router.get('/', WorkersController.index);
router.post('/', photoMulter, WorkersController.store, UploadController.storeWorker);
router.get('/:id', WorkersController.show);
router.put('/:id', photoMulter, WorkersController.update, UploadController.storeWorker);
// router.put('/:id', WorkersController.updateNew);

router.get('/address', AddressController.index);

inRoutes.get('/contacttypes', ContactTypesController.index);
inRoutes.get('/jobtypes', JobtypeController.index);
inRoutes.get('/contracts', ContractController.index);
inRoutes.get('/workerscontracts', WorkerContractController.index);

export default router;
