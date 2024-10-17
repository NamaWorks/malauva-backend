const Purchase = require("../models/Purchase.model")

const getPurchases = async (req, res, next) => {
  try {
    const allPurchases = await Purchase.find()
    return res.status(200).json(allPurchases)
  } catch (error) {
    return res.status(400).json("failed at getPurchases")
  }
}

const getPurchaseById = async (req, res, next) => {
  try {
    const {id} = req.params
    const user = await User.findById(id)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json("failed at getPurchaseById")
  }
}

module.exports = { getPurchases, getPurchaseById }