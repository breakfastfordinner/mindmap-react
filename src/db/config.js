/* eslint-disable no-console */

const mongoose = require('mongoose');
global.Promise = require('bluebird');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/data/mindmap-react', {
  server: { reconnectTries: Number.MAX_VALUE },
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB connection open');
});

module.exports = db;
