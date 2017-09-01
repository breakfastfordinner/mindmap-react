const express = require('express');
const AuthCtrl = require('./controllers/auth');
const MapCtrl = require('./controllers/maps');
require('./config/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const routes = (app) => {
  const apiRoutes = express.Router();
  const authRoutes = express.Router();
  const mapRoutes = express.Router();


  apiRoutes.use('/auth', authRoutes); // /api/auth routes
  apiRoutes.use('/maps', mapRoutes); // /api/maps routes

  // Routes for user authentication (registration and log-in)
  authRoutes.post('/register', AuthCtrl.register);
  authRoutes.post('/login', requireLogin, AuthCtrl.login);

  // Routes for interacting with maps
  mapRoutes.get('/', requireAuth, MapCtrl.getMaps);
  mapRoutes.get('/:id', requireAuth, MapCtrl.getMap);

  mapRoutes.post('/create', requireAuth, MapCtrl.createMap);

  mapRoutes.put('/edit/:id', requireAuth, MapCtrl.editMap);
  mapRoutes.put('/edit/name/:id', requireAuth, MapCtrl.editMapName);

  mapRoutes.delete('/destroy/:id', requireAuth, MapCtrl.destroyMap);

  // dummy route for testing protected route
  apiRoutes.get('/data', requireAuth, (req, res) => {
    res.send('Your protected route is working');
  });

  app.use('/api', apiRoutes);
};

module.exports = routes;
