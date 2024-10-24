const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema; 

const userSchema =  new Schema(
{
  idNumber: {type: Number, required: true},
  username: {type: String , required: true },
  email: { type: String, required: true },
  password: { type: String , required: true },
  paymentMethods: [{ type: String }],
  addresses: [{ type: String }],
  vatNumber: { type: String },
  lastConnection: { type: String },
  role: { type: String, required: false, default: "user" },
  scoresGiven: [{ type: mongoose.Types.ObjectId, ref: "wines" , required: false}],
  purchases: [{ type: mongoose.Types.ObjectId, ref:"purchases", required: false}] 
},
{
  timestamps: true,
  collection: "users"
}
);

userSchema.pre("save", function(){
  this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model('users', userSchema, "users");

module.exports = User;