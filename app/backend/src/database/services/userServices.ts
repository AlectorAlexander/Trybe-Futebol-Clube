import { sign, SignOptions } from 'jsonwebtoken';
import bcrypt = require('bcryptjs');
import jwt_decode from 'jwt-decode';
import UserModels from '../models/UserModels';

const { JWT_SECRET } = process.env;

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export default class UserServices {
  public findInfo = async (email: string, password: string) => {
    const foundUser = await UserModels.findOne({ where: { email } });
    const checkPassword = foundUser ? foundUser.password : 'THISISNOTVALIDPASSWORD';
    const validateUser: boolean = bcrypt
      .compareSync(password, checkPassword);

    const error = { status: 401, message: 'Incorrect email or password' };

    if (!foundUser || !validateUser) return error;

    return sign({
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
    }, JWT_SECRET || 'blabla', jwtConfig);
  };

  public decodedToken = (token: string): any => {
    try {
      return jwt_decode(token);
    } catch (error) {
      return { error };
    }
  };
}
