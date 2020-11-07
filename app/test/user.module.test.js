/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const { clien } = require('');

const { expect } = chai;

chai.use(chaiHttp);

describe('UserModule', () => {
  beforeEach((done) => {
    Book.remove({}, (err) => {
      done();
    });
  });
});
