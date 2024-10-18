require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const cors = require("cors")
const userRouter = require("./src/api/routes/User.routes");
const purchasesRouter = require("./src/api/routes/Purchase.routes");
const winesRouter = require("./src/api/routes/Wine.routes");

// import winesRouter from "./src/api/routes/Wine.routes.js";
// import purchasesRouter from "./src/api/routes/Purchase.routes.js";
// import userRouter from "./src/api/routes/User.routes.js";
// import cors from "cors"
// import { connectDB } from "./src/config/db.js";
// import express from "express";
// import { configDotenv } from "dotenv";
// configDotenv()

const server = express();

connectDB()
// with the next line we allow our app to read .json data
server.use(express.json())
// with the next line we allow our server to use cross origin resources
server.use(cors())

server.use("/users", userRouter)
server.use("/wines", winesRouter)
server.use("/purchases", purchasesRouter)

server.use("*", (req, res, next)=>{
  return res.status(404).json("route not found")
})

server.listen(3000,()=>{
  console.log("server started at: https://localhost:3000")
})