import { Router } from 'express';

import materialController from '../controllers/MaterialController';
import MaterialInController from '../controllers/MaterialInController';
import MaterialInItemController from '../controllers/MaterialInItemController';
import MaterialOutController from '../controllers/MaterialOutController';
import MaterialInventoryController from '../controllers/MaterialInventoryController';
import MaterialRestrictController from '../controllers/MaterialRestrictController';
import MaterialReleaseController from '../controllers/MaterialReleaseController';
import MaterialReserveController from '../controllers/MaterialReserveController';

import MaterialRawController from '../controllers/MaterialRawController';

import materialIntype from '../controllers/MaterialIntypeController';

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
router.post('/', materialController.store);

// MATERIAL IN ROUTES
inRoutes.get('/items', MaterialInItemController.index);
inRoutes.get('/types', materialIntype.index);
inRoutes.post('/general', MaterialInController.storeGeneral);

inRoutes.get('/:reqMaintenance/:year', MaterialInController.show);
inRoutes.get('/rl/:reqMaintenance/:year', MaterialInController.showRL);
inRoutes.get('/', MaterialInController.index);
inRoutes.get('/rl', MaterialInController.indexRL);
inRoutes.post('/', MaterialInController.store);

// MATERIAL OUT ROUTES
// outRoutes.get('/items', MaterialOutItemController.index);
// outRoutes.get('/types', materialOuttype.index);

// outRoutes.get('/:reqMaintenance/:year', MaterialOutController.show);
outRoutes.put('/:id', MaterialOutController.update);
outRoutes.get('/', MaterialOutController.index);
outRoutes.post('/', MaterialOutController.store);

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
rawRoutes.post('/maintenanceBalanceOutput', MaterialRawController.maintenanceBalanceOutput);
rawRoutes.post('/consumeOutput', MaterialRawController.consumeOutput);
rawRoutes.post('/provisionInput', MaterialRawController.provisionInput);
rawRoutes.get('/balance', MaterialRawController.balance);

export default router;
