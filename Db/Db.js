const mongoose = require("mongoose");
require("dotenv").config();


const mongoURI = process.env.mongoURI;

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      // useUnifiedTopology: true, // Optional, depending on your MongoDB version
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
};
  module.exports = connectDb;