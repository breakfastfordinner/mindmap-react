const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/main');

const genToken = user => {
  return jwt.sign(user, config.secret, {
    expiresIn: 10000,
  });
};

const setUserInfo = user => {
  return {
    _id: user._id,
    username: user.username,
  }
};

module.exports = {

  login: (req, res, next) => {

    let userInfo = setUserInfo(req.user);

    res.status(200).json({
      auth_token: 'JWT ' + genToken(userInfo),
      user: userInfo,
    });

  },

  register: (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
      return res.status(422).send({
        error: 'You must provide a username.'
      });
    }

    if (!password) {
      return res.status(422).send({
        error: 'You must provide a password.'
      });
    }

    User.findOne({ username: username }, (err, existingUser) => {
      if (err) return next(err);

      if (existingUser) {
        return res.status(422).send({
          error: 'That username is already taken.'
        });
      }

      let user = new User({
        username: username,
        password: password,
      });

      user.save((err, user) => {
        if (err) return next(err);

        let userInfo = setUserInfo(user);

        res.status(201).json({
          auth_token: 'JWT ' + genToken(userInfo),
          user: userInfo,
        });
      });
    });

  },

};
