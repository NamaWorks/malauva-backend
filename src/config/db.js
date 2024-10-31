const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connecting to DB successful");
  } catch (error) {
    console.log("error connecting to DB");
    console.log(error);
  }
};

module.exports = { connectDB };
