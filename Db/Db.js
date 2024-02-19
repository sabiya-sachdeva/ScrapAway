const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://sabiya:react12345@cluster0.n83wtjt.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //promise
    console.log("Connected to Mongo Successfully");
  })
  .catch((err) => {
    console.log("Connection Unsuccessful " + err.message);
  });
