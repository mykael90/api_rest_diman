import { Router } from 'express';

import materialController from '../controllers/MaterialController';
import MaterialInController from '../controllers/MaterialInController';
import MaterialInItemController from '../controllers/MaterialInItemController';
import MaterialInventoryController from '../controllers/MaterialInventoryController';
import MaterialRestrictController from '../controllers/MaterialRestrictController';

import materialIntype from '../controllers/MaterialIntypeController';

const router = new Router();

const inRoutes = new Router();
const inventoryRoutes = new Router();
const restrictRoutes = new Router();

router.use('/in/', inRoutes);
router.use('/inventory/', inventoryRoutes);
router.use('/restrict/', restrictRoutes);

// MATERIAL ROUTES
router.get('/', materialController.index);
router.post('/', materialController.store);

// MATERIAL IN ROUTES
inRoutes.get('/items', MaterialInItemController.index);
inRoutes.get('/types', materialIntype.index);

inRoutes.get('/:reqMaintenance/:year', MaterialInController.show);
inRoutes.get('/', MaterialInController.index);
inRoutes.post('/', MaterialInController.store);

// MATERIAL INVENTORY ROUTES
inventoryRoutes.get('/', MaterialInventoryController.index);
inventoryRoutes.post('/', MaterialInventoryController.store);

// MATERIAL INVENTORY ROUTES
restrictRoutes.get('/', MaterialRestrictController.index);
restrictRoutes.post('/', MaterialRestrictController.store);

export default router;
