const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Geo Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

// Samurai Schema
const SamuraiSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  rank: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
});

const Samurai = mongoose.model('samurai', SamuraiSchema);
module.exports = Samurai;
