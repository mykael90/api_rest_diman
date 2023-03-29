import { Router } from 'express';

import PropertySipacController from '../controllers/PropertySipacController';
import BuldingSipacController from '../controllers/BuildingSipacController';

const router = new Router();

router.get('/', PropertySipacController.index);
router.get('/buildings', BuldingSipacController.index);

export default router;
