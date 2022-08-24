import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/UserModels';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
interface user {
  username: string,
  role: string,
  email: string,
  password: string
}

const mocker: user = {
  username: 'Admin',
  role: 'admin',
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
}

describe('Login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

   let HttpResponse: Response;

   beforeEach(() => {
     sinon.stub(User, "findOne").resolves(mocker as User);
   });

   afterEach(()=>{
     sinon.restore();
   })

   it('Se retorna status 200 com os dados certos', async () => {
     HttpResponse = await chai
     .request(app)
     .post('/login')
     .send({
      email: "admin@admin.com",
      password: "secret_admin"
     })     

    console.log(HttpResponse.body);

    expect(HttpResponse.status).to.equal(200)
     
   });
   it('Se retorna Token', () => {
    expect(HttpResponse.body).to.have.property("token")
  });
  it('Se retorna status 401 com a senha errada', async () => {
    HttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
     email: "admin@admin.com",
     password: "secret_amin"
    })     
    console.log(HttpResponse.body);
    
    expect(HttpResponse.status).to.equal(401)
    
  });
  it('Se retorna status 400 se um dos campos não for preenchido', async () => {
    HttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
     email: "",
     password: "secret_amin"
    })     
    console.log(HttpResponse.body);
    
    expect(HttpResponse.status).to.equal(400)
    
  });
  it('Se retorna status 400 se o email for inválido', async () => {
    HttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
     email: "thanosTemRazão",
     password: "secret_amin"
    })     
    console.log(HttpResponse.body);
    
    expect(HttpResponse.status).to.equal(400)
    
  });
  it('Se retorna dá pra ter acesso com um token inválido', async () => {
    HttpResponse = await chai
    .request(app)
    .get('/login/validate')
    .send({ token: 'inválido' })     
    console.log(HttpResponse.body);
    
    expect(HttpResponse.status).to.equal(500)
    
  });

  
});
