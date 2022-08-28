import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
/* import bcrypt = require('bcryptjs'); */
import Joi = require('joi');
import UserService from '../services/userServices';

class UserController {
  constructor(private userService = new UserService()) { }

  public validate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const tkn = token || 'fail';
    const { role, error } = this.userService.decodedToken(tkn);

    if (!role) return next(error);

    res.status(StatusCodes.OK).json({ role });
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    /*  const salt = bcrypt.genSaltSync(10);
    const newPassword = await bcrypt.hashSync(password, salt); */
    const { error } = Joi.object({
      email: Joi.string().email().not().empty()
        .required(),
      password: Joi.string().not().empty().min(6)
        .required(),
    }).validate({ password, email });
    if (error) return next(error);

    const response = await this.userService.findInfo(email, password);

    if (typeof response === 'object') return next(response);

    return res.status(StatusCodes.OK).json({ token: response });
  };

  /*  public update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = req.body;
    await this.userService.update(id, user);

    res.status(StatusCodes.NO_CONTENT).end();
  };

  public remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.userService.remove(id);

    res.status(StatusCodes.OK).json({ message: 'User deleted successfully' });
  }; */
}

export default UserController;
