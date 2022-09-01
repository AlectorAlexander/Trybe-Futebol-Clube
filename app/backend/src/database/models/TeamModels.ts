import { DataTypes, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  public id: number;
  public teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  modelName: 'teams',
  sequelize: db,
  timestamps: false,
});

export default Teams;
