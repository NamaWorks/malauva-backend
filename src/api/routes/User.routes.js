const { getUsers } = require("../controllers/User.controllers");

const userRouter = require("express").Router()

userRouter.get("/",getUsers)

module.exports = userRouter