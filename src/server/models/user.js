const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

UserSchema.pre('save', function (next) {
  const user = this;
  const saltFactor = 10;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(saltFactor, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (inputPassword, cb) {
  bcrypt.compare(inputPassword, this.password, function (err, matches) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, matches);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
