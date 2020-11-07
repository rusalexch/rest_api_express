/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');

const { expect } = chai;

chai.use(chaiHttp);

describe('App', () => {
  describe('GET "/"', () => {
    it('it should GET ok', (done) => {
      chai.request(server)
        .get('/')
        .end((_err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  describe('POST "/"', () => {
    it('it should GET ok', (done) => {
      chai.request(server)
        .post('/')
        .end((_err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe('PUT "/"', () => {
    it('it should GET ok', (done) => {
      chai.request(server)
        .put('/')
        .end((_err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe('DELETE "/"', () => {
    it('it should GET ok', (done) => {
      chai.request(server)
        .delete('/')
        .end((_err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
