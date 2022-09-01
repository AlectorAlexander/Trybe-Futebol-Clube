import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/MatcheModels';
import { Response } from 'superagent';

chai.use(chaiHttp);

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJVc2VyIiwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjIwNDc3NzIsImV4cCI6MTY2MjY1MjU3Mn0.NwP7oPv9Utzno2GynnTaFK7RouDZgj-L8hYT0z9dmBk"

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

const mockers: matches[] = [
    {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "São Paulo"
        },
        "teamAway": {
            "teamName": "Grêmio"
        }
    },
    {
        "id": 2,
        "homeTeam": 9,
        "homeTeamGoals": 1,
        "awayTeam": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Internacional"
        },
        "teamAway": {
            "teamName": "Santos"
        }
    },
    {
        "id": 3,
        "homeTeam": 4,
        "homeTeamGoals": 3,
        "awayTeam": 11,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamHome": {
            "teamName": "Corinthians"
        },
        "teamAway": {
            "teamName": "Napoli-SC"
        }
    },
    {
        "id": 4,
        "homeTeam": 3,
        "homeTeamGoals": 0,
        "awayTeam": 2,
        "awayTeamGoals": 0,
        "inProgress": false,
        "teamHome": {
            "teamName": "Botafogo"
        },
        "teamAway": {
            "teamName": "Bahia"
        }
    },
    {
        "id": 5,
        "homeTeam": 7,
        "homeTeamGoals": 1,
        "awayTeam": 10,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Flamengo"
        },
        "teamAway": {
            "teamName": "Minas Brasília"
        }
    },
    {
        "id": 6,
        "homeTeam": 5,
        "homeTeamGoals": 1,
        "awayTeam": 13,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "Cruzeiro"
        },
        "teamAway": {
            "teamName": "Real Brasília"
        }
    },
    {
        "id": 7,
        "homeTeam": 12,
        "homeTeamGoals": 2,
        "awayTeam": 6,
        "awayTeamGoals": 2,
        "inProgress": false,
        "teamHome": {
            "teamName": "Palmeiras"
        },
        "teamAway": {
            "teamName": "Ferroviária"
        }
    },
    {
        "id": 8,
        "homeTeam": 15,
        "homeTeamGoals": 0,
        "awayTeam": 1,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
            "teamName": "São José-SP"
        },
        "teamAway": {
            "teamName": "Avaí/Kindermann"
        }
    },
]

const mocker: matches = {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
        "teamName": "São Paulo"
    },
    "teamAway": {
        "teamName": "Grêmio"
    }
}

describe('Matches acertos', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

   let HttpResponse: Response;

   beforeEach( async () => {
     sinon.stub(Matches, "findAll").resolves(mockers as unknown as Matches[]);
     sinon.stub(Matches, "findOne").resolves(mocker as unknown as Matches);
   });

   afterEach(()=>{
     sinon.restore();
   })
  it('Se retorna os dados corretamente', async () => {
    HttpResponse = await chai
    .request(app)
    .get('/matches')
    
    
    expect(HttpResponse.status).to.equal(200)
  })
  it('Se retorna a quantidade de dados está correta', async () => {
    HttpResponse = await chai
    .request(app)
    .get('/matches')
    
    
    expect((HttpResponse.body).length).to.equal(8)
  });
  it('Se dá pra colocar um novo matche sem token', async () => {
    
    HttpResponse = await chai
     .request(app)
     .post('/matches')
     .send({
        homeTeam: 2,
        homeTeamGoals: 0,
        awayTeam: 9,
        awayTeamGoals: 2,
     })     
    /* token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJVc2VyIiwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjIwNDc3NzIsImV4cCI6MTY2MjY1MjU3Mn0.NwP7oPv9Utzno2GynnTaFK7RouDZgj-L8hYT0z9dmBk */
    
    expect(HttpResponse.body.message).to.equal('Token not found')
})
it('Se dá pra colocar um novo matche com um token inválido', async () => {
    
    HttpResponse = await chai
     .request(app)
     .post('/matches')
     .send({
        homeTeam: 2,
        homeTeamGoals: 0,
        awayTeam: 9,
        awayTeamGoals: 2,
     }).set('Authorization', 'tokeninválido')
    expect(HttpResponse.body.message).to.equal('Token must be a valid token')
})
    it('Se dá pra colocar um novo matche com token válido', async () => {
    
        HttpResponse = await chai
         .request(app)
         .post('/matches')
         .send({
            homeTeam: 16,
            homeTeamGoals: 2,
            awayTeam: 8,
            awayTeamGoals: 2,
         }).set('Authorization', token)   
        expect(HttpResponse.body.homeTeam).to.equal(16)
        expect(HttpResponse.body.awayTeam).to.equal(8)
        expect(HttpResponse.body.homeTeamGoals).to.equal(2)
        expect(HttpResponse.body.awayTeamGoals).to.equal(2)
        expect(HttpResponse.body.inProgress).to.equal(true)
    })
        
        
  it('Se dá pra acessar informações de um matche em específico', async () => {
    HttpResponse = await chai
    .request(app)
    .get('/matches/1')
    
    expect(HttpResponse.body.id).to.equal(1)
    expect(HttpResponse.body.teamHome.teamName).to.equal('São Paulo')
    expect(HttpResponse.body.teamAway.teamName).to.equal('Grêmio')
  });
  it('Se dá pra atualizar os gols de partidas em andamento', async () => {
    
    HttpResponse = await chai
     .request(app)
     .patch('/matches/2')
     .send({
        homeTeamGoals: 0,
        awayTeamGoals: 2,
     })    
    
    expect(HttpResponse.status).to.equal(200)
})
it('Se dá pra finalizar partidas em andamento', async () => {
    
    HttpResponse = await chai
     .request(app)
     .patch('/matches/2/finish')
    expect(HttpResponse.status).to.equal(200)
    expect(HttpResponse.body.message).to.equal('Finished')
})
it('Se não é possível inserir partida com times iguais', async () => {
    
    HttpResponse = await chai
    .request(app)
    .post('/matches')
    .send({
       homeTeam: 16,
       homeTeamGoals: 2,
       awayTeam: 16,
       awayTeamGoals: 2,
    }).set('Authorization', token)   
    expect(HttpResponse.status).to.equal(401)
    expect(HttpResponse.body.message).to.equal('It is not possible to create a match with two equal teams')
})
})

describe('Matches erro', () => {
    /**
     * Exemplo do uso de stubs com tipos
     */
  
     let HttpResponse: Response;
  
     beforeEach(() => {
       sinon.stub(Matches, "findOne").resolves(null);
     });
  
     afterEach(()=>{
       sinon.restore();
     })
     it('Se dá erro 404 se o id do matche doesn"t eczixti', async () => {
        HttpResponse = await chai
       .request(app)
       .get('/matches/12')
       
       expect(HttpResponse.status).to.equal(404)
       expect(HttpResponse.body.message).to.equal('Matche not found!')
     });
})
