import { Router } from 'express';

import UploadController from '../controllers/UploadController';

import materialController from '../controllers/MaterialController';
import MaterialInController from '../controllers/MaterialInController';
import MaterialInItemController from '../controllers/MaterialInItemController';
import MaterialOutController from '../controllers/MaterialOutController';
import MaterialOutItemController from '../controllers/MaterialOutItemController';
import MaterialOutDiscardtypeController from '../controllers/MaterialOutDiscardtypeController';
import MaterialInventoryController from '../controllers/MaterialInventoryController';
import MaterialRestrictController from '../controllers/MaterialRestrictController';
import MaterialReleaseController from '../controllers/MaterialReleaseController';
import MaterialReserveController from '../controllers/MaterialReserveController';

import MaterialRawController from '../controllers/MaterialRawController';

import materialIntype from '../controllers/MaterialIntypeController';

import { photoArrayMulter, photoMulter } from '../config/multerConfig';

const router = new Router();

const inRoutes = new Router();
const outRoutes = new Router();
const inventoryRoutes = new Router();
const restrictRoutes = new Router();
const releaseRoutes = new Router();
const reserveRoutes = new Router();
const rawRoutes = new Router();

router.use('/in/', inRoutes);
router.use('/out/', outRoutes);
router.use('/inventory/', inventoryRoutes);
router.use('/restrict/', restrictRoutes);
router.use('/release/', releaseRoutes);
router.use('/reserve/', reserveRoutes);
router.use('/raw/', rawRoutes);

// MATERIAL ROUTES
router.get('/', materialController.index);
router.post(
  '/temporary',
  photoMulter,
  materialController.storeTemporary,
  UploadController.storeMaterial,
);
router.post('/', materialController.storeSipac);
router.get('/workersbyitems', materialController.indexWorkerByMaterial);
router.get('/itemsbyworkers', materialController.indexMaterialByWorker);
router.get('/:id', materialController.show);

// MATERIAL IN ROUTES
// inRoutes.post('/upload', photoArrayMulter, UploadController.storeMaterialIn);
inRoutes.get('/items', MaterialInItemController.index);
inRoutes.get('/itemsworkers', MaterialInItemController.indexMaterialWorker);
inRoutes.get('/types', materialIntype.index);
inRoutes.post(
  '/general',
  photoArrayMulter,
  MaterialInController.storeGeneral,
  UploadController.storeMaterialIn,
);

inRoutes.get('/:reqMaintenance/:year', MaterialInController.show);
inRoutes.get('/rl/:reqMaintenance/:year', MaterialInController.showRL);
inRoutes.get('/', MaterialInController.index);
inRoutes.get('/rl', MaterialInController.indexRL);
inRoutes.post('/', MaterialInController.store);
inRoutes.post('/reqMaterial/', MaterialInController.showId);

// MATERIAL OUT ROUTES
// outRoutes.get('/items', MaterialOutItemController.index);
// outRoutes.get('/types', materialOuttype.index);

// outRoutes.get('/:reqMaintenance/:year', MaterialOutController.show);
outRoutes.put('/:id', MaterialOutController.update);
outRoutes.get('/discardtypes', MaterialOutDiscardtypeController.index);
outRoutes.get('/', MaterialOutController.index);
outRoutes.post(
  '/general',
  photoArrayMulter,
  MaterialOutController.storeGeneral,
  UploadController.storeMaterialOut,
);
outRoutes.post('/', MaterialOutController.store);
outRoutes.get('/items', MaterialOutItemController.index);
outRoutes.get('/itemsworkers', MaterialOutItemController.indexMaterialWorker);

// MATERIAL INVENTORY ROUTES
inventoryRoutes.put('/:materialId', MaterialInventoryController.update);
inventoryRoutes.get('/:materialId', MaterialInventoryController.show);
inventoryRoutes.get('/', MaterialInventoryController.index);
inventoryRoutes.post('/', MaterialInventoryController.store);

// MATERIAL RESTRICT ROUTES
restrictRoutes.get('/', MaterialRestrictController.index);
restrictRoutes.post('/', MaterialRestrictController.store);

// MATERIAL RELEASE ROUTES
releaseRoutes.get('/', MaterialReleaseController.index);
releaseRoutes.post('/', MaterialReleaseController.store);

// MATERIAL RESERVE ROUTES
reserveRoutes.put('/:materialReserveId', MaterialReserveController.update);
reserveRoutes.get('/actives', MaterialReserveController.indexActives);
reserveRoutes.get('/', MaterialReserveController.index);
reserveRoutes.post('/', MaterialReserveController.store);

// MATERIAL RAW ROUTES
rawRoutes.post(
  '/maintenanceBalanceOutput',
  MaterialRawController.maintenanceBalanceOutput,
);
rawRoutes.post('/consumeOutput', MaterialRawController.consumeOutput);
rawRoutes.post('/provisionInput', MaterialRawController.provisionInput);
rawRoutes.get(
  '/materialsRelevanceBalance',
  MaterialRawController.materialsRelevanceBalance,
);
rawRoutes.get('/balance', MaterialRawController.balance);

export default router;
