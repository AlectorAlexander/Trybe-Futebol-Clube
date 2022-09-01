import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Teams from '../database/models/TeamModels';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
interface team {
  id: number,
  teamName: string
}

const mockers: team[] = [
    {
        "id": 1,
        "teamName": "Avaí/Kindermann"
    },
    {
        "id": 2,
        "teamName": "Bahia"
    },
    {
        "id": 3,
        "teamName": "Botafogo"
    },
    {
        "id": 4,
        "teamName": "Corinthians"
    },
    {
        "id": 5,
        "teamName": "Cruzeiro"
    },
    {
        "id": 6,
        "teamName": "Ferroviária"
    },
    {
        "id": 7,
        "teamName": "Flamengo"
    },
    {
        "id": 8,
        "teamName": "Grêmio"
    },
    {
        "id": 9,
        "teamName": "Internacional"
    },
    {
        "id": 10,
        "teamName": "Minas Brasília"
    },
    {
        "id": 11,
        "teamName": "Napoli-SC"
    },
    {
        "id": 12,
        "teamName": "Palmeiras"
    },
    {
        "id": 13,
        "teamName": "Real Brasília"
    },
    {
        "id": 14,
        "teamName": "Santos"
    },
    {
        "id": 15,
        "teamName": "São José-SP"
    },
    {
        "id": 16,
        "teamName": "São Paulo"
    }
]

const mocker: team = {
    "id": 12,
    "teamName": "Palmeiras"
}

describe('Teams acertos', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

   let HttpResponse: Response;

   beforeEach(() => {
     sinon.stub(Teams, "findAll").resolves(mockers as Teams[]);
     sinon.stub(Teams, "findOne").resolves(mocker as Teams);
   });

   afterEach(()=>{
     sinon.restore();
   })
  it('Se retorna os dados corretamente', async () => {
    HttpResponse = await chai
    .request(app)
    .get('/teams')
    
    
    expect(HttpResponse.status).to.equal(200)
  })
  it('Se retorna a quantidade de dados está correta', async () => {
    HttpResponse = await chai
    .request(app)
    .get('/teams')
    
    
    expect((HttpResponse.body).length).to.equal(16)
  });
  it('Se dá pra acessar informações de um time em específico', async () => {
    HttpResponse = await chai
    .request(app)
    .get('/teams/12')
    
    expect(HttpResponse.body.id).to.equal(12)
    expect(HttpResponse.body.teamName).to.equal('Palmeiras')
  });
})

describe('Teams erro', () => {
    /**
     * Exemplo do uso de stubs com tipos
     */
  
     let HttpResponse: Response;
  
     beforeEach(() => {
       sinon.stub(Teams, "findOne").resolves(null);
     });
  
     afterEach(()=>{
       sinon.restore();
     })
     it('Se dá erro 404 se o id do time doesn"t eczixti', async () => {
        HttpResponse = await chai
       .request(app)
       .get('/teams/112')
       
       expect(HttpResponse.status).to.equal(404)
       expect(HttpResponse.body.message).to.equal('Team not found!')
     });
})
