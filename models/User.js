const mongoose = require("mongoose");
// user schema
const { Schema } = mongoose;
const userSchema = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  usertype:{
    type: String,
    required: true,
  }
});

const User = mongoose.model("USER", userSchema);
module.exports = User;
