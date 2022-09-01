import { Router } from 'express';
import tokenValidation from '../database/middlewares/tokenValidation';

import MatchesController from '../database/controllers/mactchesController';
/* import Users from '../models/UserModels'; */

const router = Router();

const matchesController = new MatchesController();

const matchesSlashId = '/matches/:id';

router.get('/matches', matchesController.getAll);
router.post('/matches', tokenValidation, matchesController.createMatch);
router.get(matchesSlashId, matchesController.getById);
router.patch('/matches/:id/finish', matchesController.updateMatche);
router.patch('/matches/:id', matchesController.updateGoals);

export default router;
