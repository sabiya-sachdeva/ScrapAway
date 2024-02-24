const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.mongoURI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    //promise
    console.log("Connected to Mongo Successfully");
  })
  .catch((err) => {
    console.log("Connection Unsuccessful " + err.message);
  });
