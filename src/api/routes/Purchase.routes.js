const { isAdmin } = require("../../middlewares/isAdmin");
const { isAuth } = require("../../middlewares/isAuth");
const {
  getPurchases,
  getPurchaseById,
  deletePurchase,
  updatePurchase,
  createPurchase,
  populatePurchases,
} = require("../controllers/Purchase.controllers");

const purchasesRouter = require("express").Router();

purchasesRouter.get("/", [isAuth], getPurchases);
purchasesRouter.get("/:id", [isAuth], getPurchaseById);
purchasesRouter.post("/create", [isAuth], createPurchase);
purchasesRouter.delete("/:id", [isAdmin], deletePurchase);
purchasesRouter.patch("/:id", [isAuth], updatePurchase);
purchasesRouter.get("/", populatePurchases);

module.exports = purchasesRouter;
