const { generateSign } = require("../../utils/jwt")
const User = require("../models/User.model.js")
const bcrypt = require("bcrypt")

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find()
    return res.status(200).json(allUsers)
  } catch (error) {
    return res.status(400).json("failed at getUsers")
  }

  // return res.status(200).json("users")
}

const getUserById = async (req, res, next) => {
  try {
    const {id} = req.params
    const user = User.findById(id)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json("failed at getUserById")
  }
}

const userLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username})

    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        const token = generateSign(user._id)
        return res.status(200).json({user, token})
      }
    }

  } catch (error) {
    return res.status(400).json("failed at userLogin")
  }
}

module.exports = { getUsers, }  