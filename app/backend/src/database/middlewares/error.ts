import { NextFunction, Request, Response } from 'express';
import statusByErrorJoi from './statusCodes';

/*  const statusByErrorLocal = {
    notFound: 404,
    alreadyExists: 409,
  }; */
const error = (err: any, req: Request, res: Response, _next: NextFunction) => {
  const { isJoi, details } = err;
  if (isJoi) {
    const { message: msn } = details[0];
    let message = msn.replace('[0].', '')
      .includes('is required')
      ? 'All fields must be filled' : msn.replace('[0].', '');
    if (message.includes('is not allowed to be empty')) {
      message = 'All fields must be filled';
    }
    const { type } = details[0];
    const status = statusByErrorJoi[type];
    if (typeof status === 'number') { return res.status(status).json({ message }); }
  }

  const { message } = err;

  const status = err.status || 500;

  return res.status(status).json({ message });
};

export default error;
