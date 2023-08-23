import { Router } from 'express';

import UploadController from '../controllers/UploadController';

import CarController from '../controllers/CarController';
import CartypeController from '../controllers/CartypeController';
import CarFueltypeController from '../controllers/CarFueltypeController';

import CarOccurrenceController from '../controllers/CarOccurrenceController';
import CarOccurrencetypeController from '../controllers/CarOccurrencetypeController';

import CarInspectionController from '../controllers/CarInspectionController';

import CarAccessoryController from '../controllers/CarAccessoryController';
import CarAccessorytypeController from '../controllers/CarAccessorytypeController';

import CarStatusController from '../controllers/CarStatusController';
import CarStatustypeController from '../controllers/CarStatustypeController';

import { photoArrayMulter } from '../config/multerConfig';

const router = new Router();
const occurrence = new Router();
const inspections = new Router();
const accessories = new Router();
const statuses = new Router();

router.use('/occurrences/', occurrence);
router.use('/inspections/', inspections);
router.use('/accessories/', accessories);
router.use('/statuses/', statuses);

router.get('/', CarController.index);
router.put('/:id', CarController.update);
// router.delete('/:id', CarController.delete);
router.post('/', photoArrayMulter, CarController.store, UploadController.storeCar);

router.get('/types', CartypeController.index);
router.get('/fuel', CarFueltypeController.index);

accessories.get('/', CarAccessoryController.index);
accessories.get('/types', CarAccessorytypeController.index);
accessories.post('/', CarAccessoryController.store);
// accessories.post('/bulk', CarAccessoryController.storeBulk);
accessories.put('/', CarAccessoryController.update);
accessories.delete('/', CarAccessoryController.delete);

statuses.get('/', CarStatusController.index);
statuses.get('/types', CarStatustypeController.index);
statuses.post('/', CarStatusController.store);

occurrence.get('/', CarOccurrenceController.index);
occurrence.put('/:id', CarOccurrenceController.update);
occurrence.post('/', photoArrayMulter, CarOccurrenceController.store, UploadController.storeCarOccurrence);
occurrence.get('/types', CarOccurrencetypeController.index);

inspections.get('/', CarInspectionController.index);
inspections.put('/:id', CarInspectionController.update);
inspections.post('/', photoArrayMulter, CarInspectionController.store, UploadController.storeCarInspection);

export default router;
