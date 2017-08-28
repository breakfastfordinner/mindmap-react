const mongoose = require('mongoose');
global.Promise = require('bluebird');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/mindmap', {
  server: {reconnectTries: Number.MAX_VALUE}
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(`MongoDB error: ${err}`);
});

db.once('open', () => {
  console.log('MongoDB connection open');
});

module.exports = db;
