import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
interface matches {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: { teamName: string },
  teamAway: { teamName: string }
}

describe('LeaderBoards acertos', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

   let HttpResponse: Response;

  it('Se retorna os dados corretamente', async () => {
    HttpResponse = await chai
    .request(app)
    .get('/matches')
    
    
    expect(HttpResponse.status).to.equal(200)
  })
  it('Se dá pra filtrar a classificação dos times da casa', async () => {
    HttpResponse = await chai
    .request(app)
    .get('/leaderboard/home')
    
    
    expect((HttpResponse.body).length).to.equal(16)
    expect(HttpResponse.status).to.equal(200)
  });
  it('Se dá pra filtrar a classificação dos times de fora casa', async () => {
    HttpResponse = await chai
    .request(app)
    .get('/leaderboard/home')
    
    
    expect((HttpResponse.body).length).to.equal(16)
    expect(HttpResponse.status).to.equal(200)
});
it('Se dá pra filtrar a classificação dos times em geral', async () => {
    HttpResponse = await chai
    .request(app)
    .get('/leaderboard')
    
    
    expect((HttpResponse.body).length).to.equal(16)
    expect(HttpResponse.status).to.equal(200)
});
})