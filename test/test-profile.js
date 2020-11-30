const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("test post /api/profile/",()=>{
describe("To get all the users to show", () => {
  it("Requesting All profiles", (done) => {

    
    chai.request(server)
      .get('/api/profile')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        done();
      });
  });
});
});


describe("test post /api/profile/:id",()=>{
    describe("To get user profile by id", () => {
      it("Getting user profile by id", (done) => {
        
        const userid = "5ec56b8b1fd5f92f8050f70a" ;

        chai.request(server)
          .get('/api/profile/user/' + userid)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('user');
            response.body.should.have.property('date');
            done();
          });
      });
    });
    });

    
describe("test post /api/profile/github/:username",()=>{
    describe("To get the github profile of the user", () => {
      it("Getting the github info of the user", (done) => {
        const username = "yashpj";
        
        chai.request(server)
          .get('/api/profile/github/'+ username)
          .end((err, response) => {
            response.should.have.status(500);
            done();
          });
      });
    });
    });
    

describe("test put /api/profile/education",()=>{
    describe("PUT updating the info ", () => {
      it("Unauthorised error because this is a protected route", (done) => {
        
        
        const edu = {
            "school": "Test",
            "degree": "Associates Degree",
            "fieldofstudy": "Test",
            "from": "08-10-1607",
            "to":"08-10-1617",
            "description": "Got an associates degree"
        };

        chai.request(server)
          .put('/api/profile/education')
          .send(edu)
          .end((err, response) => {
            response.should.have.status(401);
            response.body.should.be.a('object');
            response.body.should.have.property('msg');
            done();
          });
      });
    });
    });

 