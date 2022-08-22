import { DataTypes, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  public id: number;
  public username: string;
  public email: string;
  public password: string;
  public role: string;
}

export default Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  modelName: 'users',
  sequelize: db,
});
