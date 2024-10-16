const User = require("../models/User.model")

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find()
    return res.status()
  } catch (error) {
    return res.status(400).json("failed at getUsers")
  }
}

module.exports = { getUsers, }  