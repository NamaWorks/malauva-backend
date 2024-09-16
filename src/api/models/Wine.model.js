const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const wineSchema = new Schema(
{
  name: { type: String , required: true },
  brand: { type: String, required: false , default:'no-brand' },
  picture: {type: String, required: false, default: ''},
  taste: { type: String },
  pairing: { type: String, required: false, default: "whenever you feel like it!" },
  idealTemperature: { type: Number, required: true },
  origin: {type: String, required: false },
  score: { type: Number },
  price: {type: Number},
},
{
  timestamps: true,
}
);

const Wine = mongoose.model('Wine', wineSchema);
module.exports = Wine; 