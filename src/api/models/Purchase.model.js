const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const purchaseSchema = new Schema(
  {
    idNumber: { type: Number, required: true },
    // client: { type: Number },  // remember to connect to User model
    client: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    // itemsBought: [{ type: Number }], // remember to connect to WineWine model
    itemsBought: [
      { type: mongoose.Types.ObjectId, ref: "wines", required: true },
    ],
    totalSpent: { type: Number },
    paymentMethod: { type: String },
    address: { type: String },
    vatNumber: { type: Boolean },
    date: { type: String, default: new Date() },
    status: {
      type: String,
      enum: ["delivered", "shipping", "processing", "canceled", "in return"],
      default: "processing",
    },
  },
  {
    timestamps: true,
    collection: "purchases",
  },
);

const Purchase = mongoose.model("purchases", purchaseSchema, "purchases");
module.exports = Purchase;
