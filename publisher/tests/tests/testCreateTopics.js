/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import createUser from '../testUtils/createTestAccount';

// Configure chai
chai.use(chaiHttp);
chai.should();
let userData;
describe('Test topics endpoints', () => {
  before(async () => {
    userData = await createUser();
  });
  describe('POST /', () => {
    it('should create topics', (done) => {
      chai.request(app)
        .post('/topic')
        .set('authorization', `Bearer ${userData[0].token}`)
        .send({ name: 'test topic' })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          done();
        });
    }).timeout(10000);
  });
  it('should fetch topics', (done) => {
    chai.request(app)
      .get('/topic')
      .set('authorization', `Bearer ${userData[0].token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        done();
      });
  }).timeout(10000);
});
