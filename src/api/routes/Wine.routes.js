const { getWines } = require("../controllers/Wine.controllers")

const winesRouter = require("express").Router()

winesRouter.get("/", getWines)

module.exports = winesRouter