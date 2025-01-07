require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const cors = require("cors");
const userRouter = require("./src/api/routes/User.routes");
const purchasesRouter = require("./src/api/routes/Purchase.routes");
const winesRouter = require("./src/api/routes/Wine.routes");
const { configCloudinary } = require("./src/middlewares/files.middleware");

// with the next line we initialize the Cloudinary connection configuration
configCloudinary();

const server = express();

connectDB();
server.use(express.json())
// with the next line we allow our server to use cross origin resources
server.use(cors());
// with the next line we allow our app to read .json data
server.use(express.json());

server.use("/users", userRouter);
server.use("/wines", winesRouter);
server.use("/purchases", purchasesRouter);

server.use("*", (req, res, next) => {
  return res.status(404).json("no route for you today");
});

const prepareServerForDev = () => {
  server.listen(3000, () => {
    console.log("server started at: http://localhost:3000");
  });
};

prepareServerForDev();

module.exports = server;
