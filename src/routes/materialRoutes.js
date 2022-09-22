import { Router } from 'express';

import materialController from '../controllers/MaterialController';
import MaterialInController from '../controllers/MaterialInController';
import MaterialInItemController from '../controllers/MaterialInItemController';

import materialIntype from '../controllers/MaterialIntypeController';

const router = new Router();

const inRoutes = new Router();

router.use('/in/', inRoutes);

// MATERIAL ROUTES
router.get('/', materialController.index);
router.post('/', materialController.store);

// MATERIAL IN ROUTES
inRoutes.get('/items', MaterialInItemController.index);
inRoutes.get('/types', materialIntype.index);

inRoutes.get('/:reqMaintenance/:year', MaterialInController.show);
inRoutes.get('/', MaterialInController.index);
inRoutes.post('/', MaterialInController.store);

export default router;
