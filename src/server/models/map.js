const mongoose = require('mongoose');
require('./user');

const Schema = mongoose.Schema;

const MapSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  tree: {
    type: Object,
    require: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Map', MapSchema);
