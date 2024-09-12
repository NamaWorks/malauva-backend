require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");

connectDB()

const server = express();

server.use("*", (req, res, next)=>{
  return res.status(404).json("route not found")
})

server.listen(3000,()=>{
  console.log("server started at: https://localhost:3000")
})