/* eslint-disable no-console */

const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../src/server/index.js');
const handler = require('../server/pageHandler.js');
const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');
// var app = require('express')

// "test": "eslint src && mocha --coverage",

chai.use(chaiHttp);
describe('server', () => {
  describe('GET /', () => {
    it('should return plain text "Not logged in"', (done) => {
      chai.request(app)
        .get('/')
        .end((req, res) => {
          res.should.have.status(200);
          res.text.should.equal('Not logged in');
          done();
        });
    });
  });

  describe('GET /index', () => {
    it('should return plain text "Map index"', (done) => {
      chai.request(app)
        .get('/index')
        .end((req, res) => {
          // console.log(res);
          res.should.have.status(200);
          res.text.should.equal('Map index');
          done();
        });
    });
  });
});
