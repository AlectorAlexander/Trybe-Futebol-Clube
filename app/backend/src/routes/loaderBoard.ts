import { Router } from 'express';

import LoaderBoards from '../database/controllers/loaderBoardsController';
/* import Users from '../models/UserModels'; */

const router = Router();

const loaderBoardsController = new LoaderBoards();

router.get('/leaderboard', loaderBoardsController.getAll);
router.get('/leaderboard/home', loaderBoardsController.getHome);
router.get('/leaderboard/away', loaderBoardsController.getAway);
export default router;
