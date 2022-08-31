import Matches from '../models/MatcheModels';
import Teams from '../models/TeamModels';

interface Board {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

type Where = 'home' | 'away' | null;

interface NewBoard {
  point: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
}

interface Team {
  id: number,
  teamName: string,
}

const board: Board = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '',
};

export default class LeaderboardServices {
  public model: Matches;
  public teams: Teams;
  public board: Board;

  constructor() {
    this.model = new Matches();
    this.teams = new Teams();
  }

  static team1bigger(team1: number, team2: number): NewBoard {
    const goalsFavor = team1;
    const goalsOwn = team2;
    const goalsBalance = team1 - team2;
    return {
      point: 3,
      totalGames: 1,
      totalVictories: 1,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor,
      goalsOwn,
      goalsBalance,
    };
  }

  static team2bigger(team1: number, team2: number): NewBoard {
    const goalsBalance = team1 - team2;
    const goalsFavor = team1;
    const goalsOwn = team2;

    return {
      point: 0,
      totalGames: 1,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 1,
      goalsFavor,
      goalsOwn,
      goalsBalance,
    };
  }

  static compareTeams(team1: number, team2: number): NewBoard {
    if (team1 > team2) { return this.team1bigger(team1, team2); }
    if (team1 < team2) return this.team2bigger(team1, team2);
    const goalsFavor = team1;
    const goalsOwn = team2;
    return {
      point: 1,
      totalGames: 1,
      totalVictories: 0,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor,
      goalsOwn,
      goalsBalance: 0,
    };
  }

  static checkWhere(id: number, teamName: string, matches: Matches[]) {
    const newBoard = JSON.parse(JSON.stringify(board));
    matches.filter(({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals }) => {
      if (id === homeTeam || id === awayTeam) {
        const table = homeTeam === id ? this.compareTeams(homeTeamGoals, awayTeamGoals)
          : this.compareTeams(awayTeamGoals, homeTeamGoals);
        newBoard.name = teamName;
        newBoard.totalPoints += table.point;
        newBoard.totalGames += table.totalGames;
        newBoard.totalVictories += table.totalVictories;
        newBoard.totalDraws += table.totalDraws;
        newBoard.totalLosses += table.totalLosses;
        newBoard.goalsFavor += table.goalsFavor;
        newBoard.goalsOwn += table.goalsOwn;
        newBoard.goalsBalance += table.goalsBalance;
      }
      return newBoard;
    });
    return newBoard;
  }

  static async promisseResolves(team: Team, where: Where) {
    let listOfMatches;
    const { id, teamName } = team;
    if (where === 'home') {
      listOfMatches = await Matches
        .findAll({ where: { inProgress: false, homeTeam: id } });
      return this.checkWhere(id, teamName, listOfMatches);
    }
    if (where === 'away') {
      listOfMatches = await Matches
        .findAll({ where: { inProgress: false, awayTeam: id } });
      return this.checkWhere(id, teamName, listOfMatches);
    }
    if (where === null) {
      listOfMatches = await Matches
        .findAll({ where: { inProgress: false } });
      return this.checkWhere(id, teamName, listOfMatches);
    }
  }

  static orderByGolsContra(a: Board, b: Board) {
    if (a.goalsOwn < b.goalsOwn) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    return 0;
  }

  static orderByGols(a: Board, b: Board) {
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor === b.goalsFavor) return this.orderByGolsContra(a, b);
    return 0;
  }

  static orderByBalance(a: Board, b: Board) {
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance === b.goalsBalance) return this.orderByGols(a, b);
    return 0;
  }

  static orderByVictories(order: Board[]) {
    return order.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints === b.totalPoints) return this.orderByBalance(a, b);
      return 0;
    });
  }

  static async getAll(where: Where) {
    const teams = await Teams.findAll();
    const leaderBoard = Promise.all(teams.map(async (team) => {
      const lboard = await this.promisseResolves((<Team><unknown>team), where);
      const eff = lboard.totalPoints / (lboard.totalGames * 3);
      lboard.efficiency = (eff * 100).toFixed(2);
      return lboard;
    }));
    return this.orderByVictories(await leaderBoard as Board[]);
  }
}
