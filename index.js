const express = require("express");


const server = express();

server.listen(3000,()=>{
  console.log("server started at: https://localhost:3000")
})