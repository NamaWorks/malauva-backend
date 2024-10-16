const { getPurchases } = require("../controllers/Purchase.controllers")

const purchasesRouter = require("express").Router()

purchasesRouter.get("/", getPurchases)

module.exports = purchasesRouter