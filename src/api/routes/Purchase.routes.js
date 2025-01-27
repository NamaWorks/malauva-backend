const { isAdmin } = require("../../middlewares/isAdmin");
const { isAuth } = require("../../middlewares/isAuth");
const {
  getPurchases,
  getPurchaseById,
  deletePurchase,
  updatePurchase,
  createPurchase,
  populatePurchases,
  getLastIdNumber,
} = require("../controllers/Purchase.controllers");

const purchasesRouter = require("express").Router();

purchasesRouter.get("/", [isAdmin], getPurchases);
purchasesRouter.get("/lastid", [isAuth], getLastIdNumber);
purchasesRouter.get("/id/:id", [isAuth], getPurchaseById);
purchasesRouter.post("/create", [isAuth], createPurchase);
purchasesRouter.delete("/:id", [isAdmin], deletePurchase);
purchasesRouter.patch("/:id", [isAuth], updatePurchase);
purchasesRouter.get("/", populatePurchases);

module.exports = purchasesRouter;
