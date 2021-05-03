/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Test notification receiver', () => {
  describe('POST /', () => {
    it('should receive data on test1', (done) => {
      chai.request(app)
        .post('/test1')
        .send({ ping: 'hello' })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          done();
        });
    });

    it('should receive data on test2', (done) => {
      chai.request(app)
        .post('/test2')
        .send({ ping: 'hello' })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          done();
        });
    });
  });
});
