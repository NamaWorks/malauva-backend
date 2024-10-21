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

const userSignup = async (req, res, next) => {
  try {
    const newUser = new User({...req.body})

    const userDuplicated = await user.findOne({email:req.body.email})
    userDuplicated && res.status(400).json("that email is already in use")

    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)

  } catch (error) {
    return res.status(400).json("failed at userSignup")
  }
}


const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const userToDelete = await User.findById(id)

    const userDeleted = await User.findByIdAndDelete(id)

    return res.status(200).json(userDeleted)
  } catch (error) {
    return res.status(400).json(`error at deleteUser: ${error}`)
  }
}

const updateUser = async (req,res,next) => {
  try {
    const { id } = req.params
    const originalUser = await User.findById(id)

    const newUser = new Useer({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      moneySpent: req.body.moneySpent,
      paymentMethods: req.body.paymentMethods,
      addresses: req.body.addresses,
      vatNumber: req.body.vatNumber,
      lastConnection: req.body.lastConnection
    })

    newUser._id = id
    const updatedUser = await User.findByIdAndUpdate(id, newUser, {new: true})
    return res.status(200).json(updatedUser)

  } catch (error) {
    return res.status(400).json(`error at updateUser: ${error}`)
  }
}

module.exports = { getUsers, getUserById, userSignup, deleteUser, updateUser }   