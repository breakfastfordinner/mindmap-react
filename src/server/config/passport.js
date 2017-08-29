const passport = require('passport');
const User = require('../models/user');
const config = require('./main');
const JwtStrat = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrat = require('passport-local');

const LOCAL_OPTS = { usernameField: 'username' };

const JWT_OPTS = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: config.secret,
};


const localLogin = new LocalStrat(LOCAL_OPTS, (username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        error: 'Your login details could not be verified.  Please try again.',
      });
    }

    user.comparePassword(password, (err, matches) => {
      if (err) {
        return done(err);
      }
      if (!matches) {
        return done(null, false, {
          error: 'Your login details could not be verified.  Please try agian.',
        });
      }

      return done(null, user);
    });
  });
});

const jwtLogin = new JwtStrat(JWT_OPTS, (payload, done) => {
  console.log('PAYLOAD', payload);
  User.findById(payload._id, (err, user) => {
    if (err) return done(err, false);
    if (user) done(null, user);
    else done(null, false);
  });
});


passport.use(jwtLogin);
passport.use(localLogin);
