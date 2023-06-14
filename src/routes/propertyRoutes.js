import { Router } from 'express';

import PropertySipacController from '../controllers/PropertySipacController';
import BuldingSipacController from '../controllers/BuildingSipacController';
import BuildingSectiontypeController from '../controllers/BuildingSectiontypeController';
import BuildingSectionController from '../controllers/BuildingSectionController';

const router = new Router();

const buildingRoutes = new Router();
const sectionRoutes = new Router();

router.use('/buildings/', buildingRoutes);

buildingRoutes.use('/sections/', sectionRoutes);

// properties
router.get('/', PropertySipacController.index);

// buildings
buildingRoutes.get('/:subRip', BuldingSipacController.show);
buildingRoutes.get('/', BuldingSipacController.index);
buildingRoutes.put('/:subRip', BuldingSipacController.update);

// sections
sectionRoutes.get('/', BuildingSectionController.index);
sectionRoutes.post('/bulk', BuildingSectionController.storeBulk);
sectionRoutes.post('/subRip', BuildingSectionController.show);
sectionRoutes.get('/recursive/:subRip', BuildingSectionController.recursive);
sectionRoutes.get('/sectionstypes', BuildingSectiontypeController.index);

export default router;
