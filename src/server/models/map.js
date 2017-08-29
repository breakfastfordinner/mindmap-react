const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MapSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  tree: {
    type: Object,
    require: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Maps', MapSchema);
