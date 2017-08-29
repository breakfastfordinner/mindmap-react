const express = require('express');
const AuthCtrl = require('./controllers/auth');
require('./config/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const routes = (app) => {
  const apiRoutes = express.Router();
  const authRoutes = express.Router();

  apiRoutes.use('/auth', authRoutes);
  authRoutes.post('/register', AuthCtrl.register);
  authRoutes.post('/login', requireLogin, AuthCtrl.login);

  apiRoutes.get('/data', requireAuth, (req, res) => {
    res.send('Your protected route is working');
  });

  app.use('/api', apiRoutes);
};

module.exports = routes;
