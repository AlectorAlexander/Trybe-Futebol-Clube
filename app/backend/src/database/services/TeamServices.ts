import Teams from '../models/TeamModels';

export default class TeamServices {
  public getAll = async () => {
    const teams = await Teams.findAll();
    return teams;
  };

  public getById = async (id: number) => {
    const teams = await Teams.findOne({ where: { id } });
    return teams;
  };
}
