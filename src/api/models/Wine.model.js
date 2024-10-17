const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const wineSchema = new Schema(
{
  name: { type: String , required: true },
  brand: { type: String, required: false , default:'no-brand' },
  picture: {type: String, required: false, default: ''},
  taste: { type: String },
  idealTemperature: { type: Number, required: true },
  origin: {type: String, required: false },
  scores: [{ type: Number }],
  price: {type: Number},
},
{
  timestamps: true,
}
);

const Wine = mongoose.model('Wine', wineSchema, "Wine");
module.exports = Wine; 