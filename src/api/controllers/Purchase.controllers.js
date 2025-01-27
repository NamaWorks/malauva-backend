const Purchase = require("../models/Purchase.model.js");

const getPurchases = async (req, res, next) => {
  try {
    const allPurchases = await Purchase.find();
    return res.status(200).json(allPurchases);
  } catch (error) {
    return res.status(400).json(`failed at getPurchases: ${error}`);
  }
};

const getPurchaseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Purchase.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(`failed at getPurchaseById: ${error}`);
  }
};

const getLastIdNumber = async (req, res, next) => {
  try {
    const purchases = await Purchase.find();
    // console.log(purchases)
    return res.status(200).json(purchases[purchases.length-1].idNumber);
    // return res.status(200).json(purchases);
  } catch (error) {
    return res.status(400).json(`failed at getLastIdNumber: ${error}`);
  }
};

const createPurchase = async (req, res, next) => {
  try {
    const newPurchase = new Purchase({
      ...req.body,
    });
    const purchaseSaved = await newPurchase.save();
    return res.status(201).json(purchaseSaved);
  } catch (error) {
    return res.status(400).json(`failed at createPurchase: ${error}`);
  }
};

const deletePurchase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const originalPurchase = await Purchase.findById(id);
    const purchaseDeleted = await Purchase.findByIdAndDelete(id);
    return res.status(200).json(purchaseDeleted);
  } catch (error) {
    return res.status(400).json(`failed at deeletePurchase: ${error}`);
  }
};

const updatePurchase = async (req, res, next) => {
  try {
    const { id } = req.params;
    const originalPurchase = Purchase.findById(id);
    const newPurchase = new Purchase({
      ...originalPurchase,
      ...req.body,
    });
    newPurchase._id = id;
    const updatedPurchase = await Purchase.findByIdAndUpdate(id, newPurchase, {
      new: true,
    });
    return res.status(200).json(updatedPurchase);
  } catch (error) {
    return res.status(400).json(`error at updatePurchase: ${error}`);
  }
};

const populatePurchases = async (req, res, next) => {
  try {
    const purchases = await Purchase.find().populate(["client", "itemsBought"]);
    return res.status(200).json(purchases);
  } catch (error) {
    return res.status(400).json(`error at populatePurchases: ${error}`);
  }
};

module.exports = {
  getPurchases,
  getPurchaseById,
  getLastIdNumber,
  deletePurchase,
  updatePurchase,
  createPurchase,
  populatePurchases,
};
