import { Router } from 'express';

import PropertySipacController from '../controllers/PropertySipacController';

const router = new Router();

router.get('/', PropertySipacController.index);

export default router;
