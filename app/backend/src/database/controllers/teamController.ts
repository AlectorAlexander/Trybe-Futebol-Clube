/* import Joi = require('joi'); */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
/* import bcrypt = require('bcryptjs'); */
/* import Joi = require('joi'); */
import TeamServices from '../services/TeamServices';

class TeamController {
  constructor(private teamServices = new TeamServices()) { }
  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.teamServices.getAll();
    res.status(StatusCodes.OK).json(teams);
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const Team = await this.teamServices.getById(id);
    const error = { status: StatusCodes.NOT_FOUND, message: 'Team not found!' };

    if (!Team) {
      return next(error);
    }

    return res.status(StatusCodes.OK).json(Team);
  };
}

export default TeamController;
