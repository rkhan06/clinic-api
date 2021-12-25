const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');

// assertion type
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHTTP);

describe('Clinics API', () => {
  // Test the GET Route
  describe('GET /api/clinic', () => {
    it('should return all dental and vet clinics', (done) => {
      chai.request(server)
        .get('/api/clinic')
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.body.should.be.an('Object');
          res.body.success.should.be.an('Boolean');
          res.body.should.have.property('data').with.lengthOf(2);
          done();
        })
    })
  })
})
