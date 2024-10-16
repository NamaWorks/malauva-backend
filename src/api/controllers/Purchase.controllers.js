const Purchase = require("../models/Purchase.model")

const getPurchases = async (req, res, next) => {
  try {
    const allPurchases = await Purchase.find()
    return res.status(200).json(allPurchases)
  } catch (error) {
    return res.status(400).json("failed at getPurchases")
  }
}

module.exports = { getPurchases,  }