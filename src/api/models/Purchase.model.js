const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemBoughtSchema = new Schema(
  {
    object: { type: mongoose.Types.ObjectId, ref: "wines", required: true },
    numberOfItems: { type: Number, required: true}
  }
)

const purchaseSchema = new Schema(
  {
    idNumber: { type: String, required: true },
    client: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    // itemsBought: [
    //   { type: mongoose.Types.ObjectId, ref: "wines", required: true },
    // ],
    itemsBought: [ itemBoughtSchema ],
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
