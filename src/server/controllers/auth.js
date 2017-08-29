const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/main');

const genToken = user => jwt.sign(user, config.secret, {
  expiresIn: 10000,
});

const setUserInfo = user => ({
  _id: user._id,
  username: user.username,
});

module.exports = {

  login: (req, res) => {
    const userInfo = setUserInfo(req.user);
    const apiToken = genToken(userInfo);

    res.status(200).json({
      auth_token: `JWT ${apiToken}`,
      user: userInfo,
    });
  },

  register: (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
      return res.status(422).send({
        error: 'You must provide a username.',
      });
    }

    if (!password) {
      return res.status(422).send({
        error: 'You must provide a password.',
      });
    }

    User.findOne({ username }, (err, existingUser) => {
      if (err) {
        return next(err);
      }

      if (existingUser) {
        return res.status(422).send({
          error: 'That username is already taken.',
        });
      }

      const user = new User({ username, password });

      user.save((err, userDoc) => {
        if (err) {
          return next(err);
        }

        const userInfo = setUserInfo(userDoc);
        const apiToken = genToken(userInfo);

        res.status(201).json({
          auth_token: `JWT ${apiToken}`,
          user: userInfo,
        });
      });
    });
  },
};
