const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchaseSchema = new Schema(
  {
    idNumber: {type: Number, required: true},
    client: { type: Number },  // remember to connect to User model
    itemsBought: [{ type: Number }], // remember to connect to WineWine model
    totalSpent: { type: Number },
    paymentMethod: { type: String },
    address: { type: String },
    vatNumber: { type:  Boolean },
    date: { type: String }
  },
  {
    timestamps: true,
    collection: "purchases"
  }
);

const Purchase = mongoose.model('purchases', purchaseSchema, "purchases");
module.exports = Purchase;