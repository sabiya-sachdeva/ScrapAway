const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER", // This should match the model name you used in mongoose.model for the User schema
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contactno: {
    type: Number,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pickupdate: {
    type: String,
    required: true,
  },
  typeofwaste: {
    type: [String],
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
    // data: Buffer,
    // contentType: String
  },
});

const Waste = mongoose.model("WASTE", wasteSchema);

module.exports = Waste;
