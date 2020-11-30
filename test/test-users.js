/*const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
  it("welcomes user to the api", done => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.message).to.equals("Welcome To Testing API");
        done();
      });
  });

  it("adds 2 numbers", done => {
    chai
      .request(app)
      .post("/add")
      .send({ num1: 5, num2: 5 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.result).to.equals(10);
        done();
      });
  });
});*/

const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");


chai.should();
chai.use(chaiHttp);

describe("test post /api/users",()=>{
describe("Register user", () => {
  it("Register user", (done) => {

    const task = {
      "name": "Carry Minati",
      "email": "carryislive@gmail.com",
      "password": "yalgaaaar"
    };
    
    chai.request(server)
      .post('/api/users')
      .send(task)
      .end((err, response) => {
        response.should.have.status(400);
        response.body.should.have.property('errors');
        done();
      });
  });
});
});

