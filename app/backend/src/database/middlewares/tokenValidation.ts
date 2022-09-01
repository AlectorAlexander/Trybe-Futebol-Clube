import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import { Secret } from 'jsonwebtoken';
import Users from '../models/UserModels';
/* import Users from '../models/UserModels'; */

const { JWT_SECRET } = process.env;

const SECRET: Secret = JWT_SECRET || 'null';

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const data = jwt.verify(token, SECRET);

    const { email } = (<any>data);

    const user = await Users.findOne({ where: { email } });
    if (user) return next();

    return res.status(401).json({ message: 'Expired or invalid token' });
  } catch (e) {
    const itsTokenError = (<any>e).message.includes('jwt malformed')
    || (<any>e).message.includes('Unexpected token');
    if (itsTokenError) {
      return next({ message: 'Token must be a valid token', status: 401 });
    }
    return next(e);
  }
};

export default tokenValidation;
