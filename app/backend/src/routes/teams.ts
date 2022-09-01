import { Router } from 'express';
import TeamsController from '../database/controllers/teamController';
/* import validationUser from '../middlewares/validationUser'; */

const router = Router();

const teamsController = new TeamsController();

const teamsSlashId = '/teams/:id';

router.get('/teams', teamsController.getAll);
router.get(teamsSlashId, teamsController.getById);
/* router.post('/teams', teamsController.create);
router.put(teamsSlashId, teamsController.update);
router.delete(teamsSlashId, teamsController.remove); */

export default router;
