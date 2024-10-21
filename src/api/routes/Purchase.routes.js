const { isAuth } = require("../../middlewares/isAuth")
const { isAdmin } = require("../../utils/isAdmin")
const { getPurchases, getPurchaseById, deletePurchase, updatePurchase, createPurchase } = require("../controllers/Purchase.controllers")

const purchasesRouter = require("express").Router()

purchasesRouter.get("/", [isAuth], getPurchases)
purchasesRouter.get("/:id", [isAuth], getPurchaseById)
purchasesRouter.post("/create",[isAuth], createPurchase)
purchasesRouter.delete("/:id", [isAdmin], deletePurchase)
purchasesRouter.put("/:id", [isAuth] , updatePurchase)

module.exports = purchasesRouter