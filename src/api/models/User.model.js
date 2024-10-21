const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema; 

const userSchema =  new Schema(
{
  username: {type: String , required: true },
  email: { type: String, required: true },
  password: { type: String , required: true }, //* we have to remember to hash the password with bcrypt library 
  // purchases: [{ type: }], //* we have to remember to connect this field with the purchases collection
  moneySpent: { type: Number },
  paymentMethods: [{ type: String }],
  addresses: [{ type: String }],
  vatNumber: { type: String },
  lastConnection: { type: String },
},
{
  timestamps: true,
}
);

userSchema.pre("save", function(){
  this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model('User', userSchema, "User");

module.exports = User;