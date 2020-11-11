/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const { User } = require('../src/modules/users/user.module');

const { expect } = chai;

chai.use(chaiHttp);

const users = [
  { username: 'test1', email: 'test1@email.com', password: '123456' },
  { username: 'test2', email: 'test2@email.com', password: '123456' },
  { username: 'test3', email: 'test3@email.com', password: '123456' },
  { username: 'test4', email: 'test4@email.com', password: '123456' },
  { username: 'test5', email: 'test5@email.com', password: '123456' },
  { username: 'test6', email: 'test6@email.com', password: '123456' },
  { username: 'test7', email: 'test7@email.com', password: '123456' },
  { username: 'test8', email: 'test8@email.com', password: '123456' },
  { username: 'test9', email: 'test9@email.com', password: '123456' },
  { username: 'test10', email: 'test10@email.com', password: '123456' },
  { username: 'test11', email: 'test11@email.com', password: '123456' },
  { username: 'test12', email: 'test12@email.com', password: '123456' },
  { username: 'test13', email: 'test13@email.com', password: '123456' },
  { username: 'test14', email: 'test14@email.com', password: '123456' },
  { username: 'test15', email: 'test15@email.com', password: '123456' },
  { username: 'test16', email: 'test16@email.com', password: '123456' },
  { username: 'test17', email: 'test17@email.com', password: '123456' },
  { username: 'test18', email: 'test18@email.com', password: '123456' },
  { username: 'test19', email: 'test19@email.com', password: '123456' },
  { username: 'test20', email: 'test20@email.com', password: '123456' },
  { username: 'test21', email: 'test21@email.com', password: '123456' },
  { username: 'test22', email: 'test22@email.com', password: '123456' },
  { username: 'test23', email: 'test23@email.com', password: '123456' },
  { username: 'test24', email: 'test24@email.com', password: '123456' },
  { username: 'test25', email: 'test25@email.com', password: '123456' },
  { username: 'test26', email: 'test26@email.com', password: '123456' },
  { username: 'test27', email: 'test27@email.com', password: '123456' },
  { username: 'test28', email: 'test28@email.com', password: '123456' },
  { username: 'test29', email: 'test29@email.com', password: '123456' },
  { username: 'test30', email: 'test30@email.com', password: '123456' },
  { username: 'test31', email: 'test31@email.com', password: '123456' },
  { username: 'test32', email: 'test32@email.com', password: '123456' },
  { username: 'test33', email: 'test33@email.com', password: '123456' },
];

describe('UserModule', () => {
  beforeEach((done) => {
    User
      .destroy({
        truncate: true,
      })
      .then(() => { done(); });
  });

  describe('GET "/users"', () => {
    it('"/users" it should GET empty', (done) => {
      chai.request(server)
        .get('/users')
        .end((_err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('items');
          expect(res.body).to.have.property('limit');
          expect(res.body).to.have.property('page');
          expect(res.body).to.have.property('itemsCount');
          expect(res.body).to.have.property('pagesCount');
          expect(res.body).to.have.property('prewPage');
          expect(res.body).to.have.property('nextPage');
          expect(res.body.items).to.be.an('array');
          expect(res.body.items).to.have.length(0);
          expect(res.body.limit).to.equal(10);
          expect(res.body.page).to.equal(1);
          expect(res.body.itemsCount).to.equal(0);
          expect(res.body.pagesCount).to.equal(0);
          expect(res.body.prewPage).to.equal('');
          expect(res.body.nextPage).to.equal('');
          done();
        });
    });
    it('"/users" it should GET users', (done) => {
      User.bulkCreate(users)
        .then(() => {
          chai.request(server)
            .get('/users')
            .end((_err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('items');
              expect(res.body).to.have.property('limit');
              expect(res.body).to.have.property('page');
              expect(res.body).to.have.property('itemsCount');
              expect(res.body).to.have.property('pagesCount');
              expect(res.body).to.have.property('prewPage');
              expect(res.body).to.have.property('nextPage');
              expect(res.body.items).to.be.an('array');
              expect(res.body.items).to.have.length(10);
              expect(res.body.limit).to.equal(10);
              expect(res.body.page).to.equal(1);
              expect(res.body.itemsCount).to.equal(users.length);
              expect(res.body.pagesCount).to.equal(4);
              expect(res.body.prewPage).to.equal('');
              expect(res.body.nextPage).to.equal('/users?limit=10&page=2');
              done();
            });
        });
    });
  });

  describe('GET "/users?limit=[number]&page=[number]"', () => {
    it('"/users?limit=1&page=1" it should GET empty', (done) => {
      chai.request(server)
        .get('/users?limit=1&page=1')
        .end((_err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('items');
          expect(res.body).to.have.property('limit');
          expect(res.body).to.have.property('page');
          expect(res.body).to.have.property('itemsCount');
          expect(res.body).to.have.property('pagesCount');
          expect(res.body).to.have.property('prewPage');
          expect(res.body).to.have.property('nextPage');
          expect(res.body.items).to.be.an('array');
          expect(res.body.items).to.have.length(0);
          expect(res.body.limit).to.equal(1);
          expect(res.body.page).to.equal(1);
          expect(res.body.itemsCount).to.equal(0);
          expect(res.body.pagesCount).to.equal(0);
          expect(res.body.prewPage).to.equal('');
          expect(res.body.nextPage).to.equal('');
          done();
        });
    });
    it('"/users?limit=10&page=1" it should GET users', (done) => {
      User.bulkCreate(users)
        .then(() => {
          chai.request(server)
            .get('/users?limit=5&page=1')
            .end((_err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('items');
              expect(res.body).to.have.property('limit');
              expect(res.body).to.have.property('page');
              expect(res.body).to.have.property('itemsCount');
              expect(res.body).to.have.property('pagesCount');
              expect(res.body).to.have.property('prewPage');
              expect(res.body).to.have.property('nextPage');
              expect(res.body.items).to.be.an('array');
              expect(res.body.items).to.have.length(5);
              expect(res.body.limit).to.equal(5);
              expect(res.body.page).to.equal(1);
              expect(res.body.itemsCount).to.equal(users.length);
              expect(res.body.pagesCount).to.equal(7);
              expect(res.body.prewPage).to.equal('');
              expect(res.body.nextPage).to.equal('/users?limit=5&page=2');
              done();
            });
        });
    });
    it('"/users?limit=5&page=1" it should GET users', (done) => {
      User.bulkCreate(users)
        .then(() => {
          chai.request(server)
            .get('/users?limit=5&page=2')
            .end((_err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('items');
              expect(res.body).to.have.property('limit');
              expect(res.body).to.have.property('page');
              expect(res.body).to.have.property('itemsCount');
              expect(res.body).to.have.property('pagesCount');
              expect(res.body).to.have.property('prewPage');
              expect(res.body).to.have.property('nextPage');
              expect(res.body.items).to.be.an('array');
              expect(res.body.items).to.have.length(5);
              expect(res.body.limit).to.equal(5);
              expect(res.body.page).to.equal(2);
              expect(res.body.itemsCount).to.equal(users.length);
              expect(res.body.pagesCount).to.equal(7);
              expect(res.body.prewPage).to.equal('/users?limit=5&page=1');
              expect(res.body.nextPage).to.equal('/users?limit=5&page=3');
              done();
            });
        });
    });
    it('"/users?limit=5&page=1" it should GET users', (done) => {
      User.bulkCreate(users)
        .then(() => {
          chai.request(server)
            .get('/users?limit=5&page=7')
            .end((_err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('items');
              expect(res.body).to.have.property('limit');
              expect(res.body).to.have.property('page');
              expect(res.body).to.have.property('itemsCount');
              expect(res.body).to.have.property('pagesCount');
              expect(res.body).to.have.property('prewPage');
              expect(res.body).to.have.property('nextPage');
              expect(res.body.items).to.be.an('array');
              expect(res.body.items).to.have.length(3);
              expect(res.body.limit).to.equal(5);
              expect(res.body.page).to.equal(7);
              expect(res.body.itemsCount).to.equal(users.length);
              expect(res.body.pagesCount).to.equal(7);
              expect(res.body.prewPage).to.equal('/users?limit=5&page=6');
              expect(res.body.nextPage).to.equal('');
              done();
            });
        });
    });
    it('"/users?page=any" it should GET error', (done) => {
      chai.request(server)
        .get('/users?page=any')
        .end((_err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('msg');
          expect(res.body).to.have.property('details');
          expect(res.body.msg).to.equal('error');
          expect(res.body.details).to.equal('invalid query in request');
          done();
        });
    });
    it('"/users?limit=any" it should GET error', (done) => {
      chai.request(server)
        .get('/users?limit=any')
        .end((_err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('msg');
          expect(res.body).to.have.property('details');
          expect(res.body.msg).to.equal('error');
          expect(res.body.details).to.equal('invalid query in request');
          done();
        });
    });
  });

  // describe('GET "/users/profile', () => {
  //   it('"/users/profile" is should GET User Profile', (done) => {
  //     chai.request(server)
  //       .get('/users?limit=1&page=1')
  //       .end((_err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body).to.have.property('items');
  //         expect(res.body).to.have.property('limit');
  //         expect(res.body).to.have.property('page');
  //         expect(res.body).to.have.property('itemsCount');
  //         expect(res.body).to.have.property('pagesCount');
  //         expect(res.body).to.have.property('prewPage');
  //         expect(res.body).to.have.property('nextPage');
  //         expect(res.body.items).to.be.an('array');
  //         expect(res.body.items).to.have.length(0);
  //         expect(res.body.limit).to.equal(1);
  //         expect(res.body.page).to.equal(1);
  //         expect(res.body.itemsCount).to.equal(0);
  //         expect(res.body.pagesCount).to.equal(0);
  //         expect(res.body.prewPage).to.equal('');
  //         expect(res.body.nextPage).to.equal('');
  //         done();
  //       });
  //   });
  // });

  describe('GET "/users/{:id}', () => {
    it('"/users/profile"  is should GET Profile User with ID', (done) => {
      User.create(users[1])
        .then((user) => {
          const {
            id, username, password, email,
          } = user;
          chai.request(server)
            .get(`/users/${id}`)
            .end((_err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('username');
              expect(res.body).to.have.property('password');
              expect(res.body).to.have.property('email');
              expect(res.body.username).to.equal(username);
              expect(res.body.password).to.equal(password);
              expect(res.body.email).to.equal(email);
              done();
            });
        });
    });
  });
});
