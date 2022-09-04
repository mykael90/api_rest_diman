import { Router } from 'express';

import UnidadeController from '../controllers/UnidadeController';

const router = new Router();

router.get('/', UnidadeController.index);

export default router;
