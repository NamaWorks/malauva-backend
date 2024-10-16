const Wine = require("../models/Wine.model")

const getWines = async (req, res, next) => {
  try {
    const allWines = await Wine.find()
    return res.status(200).json(allWines)
  } catch (error) {
    return res.status(400).json("failed at getWines")
  }
}

module.exports = { getWines, }