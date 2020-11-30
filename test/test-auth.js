
const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");


chai.should();
chai.use(chaiHttp);

describe("test post /api/auth",()=>{
describe("Log in route", () => {
  it("Log in route", (done) => {

    const task ={
        "email": "iamkidd@gmail.com",
        "password": "oneAssasin1716"
    };
    
    chai.request(server)
      .post('/api/auth')
      .send(task)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property('token');
        done();
      });
  });
});

describe("Log in route", () => {
    it("Log in route , when credentials are wrong", (done) => {
  
      const task ={
          "email": "iamkidd@gmail.com",
          "password": "oneAssasin171"
      };
      
      chai.request(server)
        .post('/api/auth')
        .send(task)
        .end((err, response) => {
            response.should.have.status(400);
            response.body.should.have.property('errors');
          done();
        });
    });
  });

});

