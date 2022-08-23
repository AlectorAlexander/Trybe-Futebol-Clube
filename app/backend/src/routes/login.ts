import { Router } from 'express';
import UserController from '../database/controllers/userController';

const router = Router();

const userController = new UserController();

/* const usersSlashId = '/users/:id'; */

router.post('/login', userController.login);
router.get('/login/validate', userController.validate);
/* router.get(usersSlashId, userController.getById);
router.post('/users', validationUser, userController.create);
router.put(usersSlashId, validationUser, userController.update);
router.delete(usersSlashId, userController.remove); */

export default router;
