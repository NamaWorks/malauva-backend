const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchaseSchema = new Schema(
  {
    client: { type: String  },  // remember to connect to User model
    itemsBought: [{ type: String }], // remember to connect to Wine model
    totalSpent: { type: Number },
    paymentMethod: { type: String },
    address: { type: String },
    vatNumber: { type:  String },
    date: { type: String }
  },
  {
    timestamps: true
  }
);

const Purchase = mongoose.model('Purchase', purchaseSchema, "Purchase");
module.exports = Purchase;