const chai = require("chai");
const chaiHTTP = require("chai-http");

const server = require("../app");

// assertion type
const should = chai.should();

chai.use(chaiHTTP);

describe("Clinics API", () => {
  // Test the GET Route
  describe("GET /api/clinic", () => {
    it("Should return all dental and vet clinic records", async () => {
      const res = await chai.request(server).get("/api/clinic");
      should.exist(res);
      res.should.have.status(200);
      res.body.should.be.an("Object");
      res.body.success.should.be.an("Boolean");
      res.body.should.have.property("data").which.should.be.an("Object");
      res.body.data.should.have.property("dentalClinics").that.is.an("Array");
      res.body.data.should.have.property("vetClinics").that.is.an("Array");
    });
  });

  // Test the GET Route with query params (State = FL)
  describe("GET /api/clinic?state=FL", () => {
    it("Should return all dental and vet clinics that are in Florida", async () => {
      const res = await chai.request(server).get("/api/clinic?state=FL");
      should.exist(res);
      res.should.have.status(200);
      res.body.should.be.an("Object");
      res.body.success.should.be.an("Boolean");
      res.body.should.have.property("data").which.should.be.an("Object");
      res.body.data.should.have.property("dentalClinics").that.is.an("Array");
      res.body.data.should.have.property("vetClinics").that.is.an("Array");
      res.body.data.dentalClinics.forEach((clinic) => {
        clinic.stateName.should.equal("Florida");
      });
      res.body.data.vetClinics.forEach((clinic) => {
        clinic.stateCode.should.equal("FL");
      });
    });
  });

  // Test the GET Route with query params (State = CA, Name=Mount Sinai Hospital)
  describe("GET /api/clinic?state=CA&name=Mount%20Sinai%20Hospital", () => {
    it("Should return Clinic in California named Mount Sinai Hospital", async () => {
      const res = await chai
        .request(server)
        .get("/api/clinic?state=CA&name=Mount%20Sinai%20Hospital");
      should.exist(res);
      res.should.have.status(200);
      res.body.should.be.an("Object");
      res.body.success.should.be.an("Boolean");
      res.body.should.have.property("data").which.should.be.an("Object");
      res.body.data.should.have.property("dentalClinics").that.is.an("Array");
      res.body.data.should.have.property("vetClinics").that.is.an("Array");
      res.body.data.dentalClinics.forEach((clinic) => {
        clinic.stateName.should.equal("California");
        clinic.name.should.equal('Mount Sinai Hospital');
      });
      res.body.data.vetClinics.forEach((clinic) => {
        clinic.stateCode.should.equal("CA");
        clinic.clinicName.should.equal('Mount Sinai Hospital');
      });
    });
  });
});
