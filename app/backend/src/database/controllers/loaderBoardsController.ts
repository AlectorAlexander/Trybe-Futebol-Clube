import { /* NextFunction, */ Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
/* import bcrypt = require('bcryptjs'); */
/* import Joi = require('joi'); */
import LeaderBoardService from '../services/leaderBoardService';

class LoaderBoardsController {
  public getAll = async (req: Request, res: Response) => {
    const leader = await LeaderBoardService.getAll(null);

    return res.status(StatusCodes.OK).json(leader);
  };

  public getHome = async (req: Request, res: Response) => {
    const leader = await LeaderBoardService.getAll('home');

    return res.status(StatusCodes.OK).json(leader);
  };

  public getAway = async (req: Request, res: Response) => {
    const leader = await LeaderBoardService.getAll('away');

    return res.status(StatusCodes.OK).json(leader);
  };
}

export default LoaderBoardsController;
