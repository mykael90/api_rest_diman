import { Router } from 'express';
import multer from 'multer';

import WorkersContactController from '../controllers/WorkersContactController';
import WorkersController from '../controllers/WorkersController';

import AddressController from '../controllers/AddressController';
import ContactTypesController from '../controllers/ContactTypesController';
import JobtypeController from '../controllers/WorkerJobtypeController';
import ContractController from '../controllers/ContractController';

import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig.workers);

const router = new Router();
const inRoutes = new Router();

router.use('/', inRoutes);

router.get('/actives', WorkersController.indexActives);
router.post('/upload', upload.single('photo'), WorkersController.storeUpload);
router.get('/', WorkersController.index);
router.post('/', WorkersController.store);

router.get('/address', AddressController.index);

inRoutes.get('/contacttypes', ContactTypesController.index);
inRoutes.get('/jobtypes', JobtypeController.index);
inRoutes.get('/contracts', ContractController.index);

export default router;
