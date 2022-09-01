import Matches from '../models/MatcheModels';
import Teams from '../models/TeamModels';

export default class TeamServices {
  public getAll = async () => {
    const matches = await Matches.findAll({
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return matches;
  };

  public getById = async (id: number) => {
    const matches = await Matches.findByPk(id, {
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return matches;
  };

  public getByProgress = async (inProgress: boolean) => {
    const matches = await Matches.findAll({ where: { inProgress },
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return matches;
  };

  public createMatchInProgress = async (
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) => {
    if (homeTeam === awayTeam) {
      return 'It is not possible to create a match with two equal teams';
    }
    const teamOne = await this.getById(homeTeam);
    const teamTwo = await this.getById(awayTeam);
    if (!teamOne || !teamTwo) return 'There is no team with such id!';
    const response = await Matches
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
    return response;
  };

  public createMatchInNoProgress = async (
    id: number,
  ) => {
    try {
      await Matches
        .update({ inProgress: false }, { where: { id } });
      return 'Finished';
    } catch (error) {
      return { error };
    }
  };

  public updateGoals = async (
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) => {
    try {
      await Matches
        .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

      const response = await this.getById(id);

      return response;
    } catch (error) {
      return { error };
    }
  };
}
