import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
/* import bcrypt = require('bcryptjs'); */
import Joi = require('joi');
import MatchesServices from '../services/MatchesServices';

class MatchesController {
  constructor(private matchesServices = new MatchesServices()) { }
  public getAll = async (req: Request, res: Response) => {
    if (req.query.inProgress) {
      const { inProgress } = req.query;
      const bool = typeof inProgress === 'string' ? !!inProgress.includes('true') : false;
      const matches = await this.matchesServices.getByProgress(bool);

      return res.status(StatusCodes.OK).json(matches);
    }
    const teams = await this.matchesServices.getAll();
    return res.status(StatusCodes.OK).json(teams);
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const Matche = await this.matchesServices.getById(id);
    const error = { status: StatusCodes.NOT_FOUND, message: 'Matche not found!' };

    if (!Matche) {
      return next(error);
    }

    return res.status(StatusCodes.OK).json(Matche);
  };

  public createMatch = async (req: Request, res: Response, next: NextFunction) => {
    const { homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals } = req.body;

    const { error } = Joi.object({
      homeTeam: Joi.number().not().empty().required(),
      awayTeam: Joi.number().not().empty().required(),
      homeTeamGoals: Joi.number().not().empty().required(),
      awayTeamGoals: Joi.number().not().empty().required(),
    }).validate({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });
    if (error) return next(error);

    const Matche = await this.matchesServices
      .createMatchInProgress(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);

    if (typeof Matche === 'string') {
      const status = Matche.includes('There is no team with such id!') ? 404 : 401;
      return next({ status, message: Matche });
    }
    return res.status(StatusCodes.CREATED).json(Matche);
  };

  public updateMatche = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const Matche = await this.matchesServices.createMatchInNoProgress(id);

    if (typeof Matche === 'string') {
      return res
        .status(StatusCodes.OK).json({ message: Matche });
    }
    return next(Matche);
  };

  public updateGoals = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const {
      homeTeamGoals,
      awayTeamGoals } = req.body;
    const Matche = await this.matchesServices.updateGoals(id, homeTeamGoals, awayTeamGoals);

    if (!(<any>Matche).error) {
      return res
        .status(StatusCodes.OK).json(Matche);
    }
    return next(Matche);
  };
}

export default MatchesController;
