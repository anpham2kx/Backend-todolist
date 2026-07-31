const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Ket noi thanh cong!");
  } catch (error) {
    console.error("Ket noi that bai");
  }
};

module.exports = connectDB;