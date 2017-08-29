const mongoose = require('mongoose');
// const User = require('./user.js');

const mapsSchema = mongoose.Schema({
  map_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  tree: {
    type: Object,
    require: true,
  },
  createdAt: Date,
});

const Maps = mongoose.model('Maps', mapsSchema);

module.exports = Maps;
