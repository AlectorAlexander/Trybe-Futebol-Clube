import { sign, SignOptions } from 'jsonwebtoken';
import UserModels from '../models/UserModels';

const { JWT_SECRET } = process.env;

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export default class UserServices {
  public findInfo = async (email: string, password: string) => {
    const foundUser = await UserModels.findOne({ where: { email, password } });
    if (!foundUser) return undefined;

    return sign({
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
    }, JWT_SECRET || 'blabla', jwtConfig);
  };
}
