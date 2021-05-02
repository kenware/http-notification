/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import app from '../../server';
import createUser from '../testUtils/createTestAccount';
import createSubscription from '../testUtils/createSub';
import Models from '../../server/models';

// Configure chai
chai.use(chaiHttp);
chai.should();
let userData;
let topic;
const url = 'http://localhost:5000';
const nockUrl = 'http://subscriber2:5000';

describe('Test subscription and publish', () => {
  before(async () => {
    userData = await createUser();
    topic = await Models.Topic.findOrCreate({
      where: {
        accountId: userData[0].account.id,
        name: 'test topic',
      },
    });

    await createSubscription(topic[0], `${url}/api/v1/test2`);
    // create subscription with unreachable endpoint
    await createSubscription(topic[0], `${url}/api/v1/test3`);

    nock.cleanAll();

    // Mock the second subscriber endpoint to be unreachable
    const interceptor = nock(nockUrl)
      .post('/api/v1/test3', { topic: topic[0].name, data: { message: 'test publishing message' } })
      .reply(400, 'unreachable');

    // mock the external subscribers endpoint during publishing
    interceptor
      .post('/api/v1/test2', { topic: topic[0].name, data: { message: 'test publishing message' } })
      .reply(201, { message: 'test publishing message' });
  });

  describe('POST /', () => {
    it('should create subscriptions', (done) => {
      chai.request(app)
        .post(`/subscribe/${topic[0].name}`)
        .set('authorization', `Bearer ${userData[0].token}`)
        .send({ url: `${url}/api/v1/test1` })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('url').eql(`${url}/api/v1/test1`);
          res.body.should.have.property('topic').eql(topic[0].name);
          done();
        });
    }).timeout(10000);
  });

  it('should publish to topics', (done) => {
    chai.request(app)
      .post(`/publish/${topic[0].name}`)
      .set('authorization', `Bearer ${userData[0].token}`)
      .send({ message: 'test publishing message' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('array');
        res.body[0].should.have.property('url').eql(`${url}/api/v1/test2`);
        res.body[0].should.have.property('status').eql(201);
        done();
      });
  }).timeout(10000);

  it('should fail to create subscription with invalid url', (done) => {
    chai.request(app)
      .post(`/subscribe/${topic[0].name}`)
      .set('authorization', `Bearer ${userData[0].token}`)
      .send({ url: 'invalidurl/api/v1/test1' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.message.should.have.property('url').eql(['Invalid url parameter']);
        done();
      });
  }).timeout(10000);

  it('should fail to create subscription with non existent topic', (done) => {
    chai.request(app)
      .post('/subscribe/non existent')
      .set('authorization', `Bearer ${userData[0].token}`)
      .send({ url: `${url}/api/v1/test1` })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        res.body.should.have.property('message').eql('The specied topic does not exist in your account');
        done();
      });
  }).timeout(10000);

  it('publishing to subscribers with unreachable endpoint should return appropriate error response', (done) => {
    // Mock the second subscriber endpoint to be unreachable
    nock(nockUrl)
      .post('/api/v1/test3', { topic: topic[0].name, data: { message: 'test publishing message' } })
      .reply(400, 'unreachable');

    chai.request(app)
      .post(`/publish/${topic[0].name}`)
      .set('authorization', `Bearer ${userData[0].token}`)
      .send({ message: 'test publishing message' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.an('array');
        const response = res.body.find((a) => a.url === `${url}/api/v1/test3`);
        response.should.have.property('url').eql(`${url}/api/v1/test3`);
        response.should.have.property('status').eql(400);
        response.should.have.property('message').eql('unreachable');
        done();
      });
  }).timeout(10000);
});
