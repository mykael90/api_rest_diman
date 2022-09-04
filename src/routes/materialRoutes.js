import { Router } from 'express';

import materialController from '../controllers/MaterialController';
import MaterialInController from '../controllers/MaterialInController';

import materialIntype from '../controllers/MaterialIntypeController';

const router = new Router();

const inRoutes = new Router();

router.use('/in/', inRoutes);

// MATERIAL ROUTES
router.get('/', materialController.index);
router.post('/', materialController.store);

// MATERIAL IN ROUTES
inRoutes.get('/types', materialIntype.index);

inRoutes.get('/', MaterialInController.index);
inRoutes.post('/', MaterialInController.store);

export default router;
