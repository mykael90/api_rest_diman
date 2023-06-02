import { Router } from 'express';

import PropertySipacController from '../controllers/PropertySipacController';
import BuldingSipacController from '../controllers/BuildingSipacController';
import BuildingSectiontypeController from '../controllers/BuildingSectiontypeController';
import BuildingSectionController from '../controllers/BuildingSectionController';

const router = new Router();

router.get('/', PropertySipacController.index);
router.get('/buildings/sections', BuildingSectionController.index);
router.post('/buildings/sections/bulk', BuildingSectionController.storeBulk);
router.post('/buildings/sections/subRip', BuildingSectionController.show);
router.get(
  '/buildings/sections/recursive/:subRip',
  BuildingSectionController.recursive
);
router.get('/buildings/sectionstypes', BuildingSectiontypeController.index);
router.get('/buildings', BuldingSipacController.index);

export default router;
