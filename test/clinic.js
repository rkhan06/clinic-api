const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');

// assertion type
var should = chai.should();

chai.use(chaiHTTP);

describe('Clinics API', () => {
  // Test the GET Route
  describe('GET /api/clinic', () => {
    it('should return all dental and vet clinics', async () => {
      const res = await chai.request(server).get('/api/clinic');
      should.exist(res);
      res.should.have.status(200);
      res.body.should.be.an('Object');
      res.body.success.should.be.an('Boolean');
      res.body.should.have.property('data').which.should.be.an('Object');
      res.body.data.should.have.property('dentalClinics').that.is.an('Array');
      res.body.data.should.have.property('vetClinics').that.is.an('Array');
    })
  })
})
