const express = require("express");

const router = express.Router();

require("../Db/Db");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { fname, lname, email, password, cpassword } = req.body; // destructing
  if (!fname || !lname || !email || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill these filed" });
  }

  try {
    const userexists = await User.findOne({ email: email });

    if (userexists) {
      return res.status(422).json({ error: "email alredy exits" });
    }

    const user = new User({ fname, lname, email, password, cpassword }); //if key value same then no need to mention key :value

    await user.save();

    res.status(201).json({ message: "data saved" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt:", req.body); // Debug logging

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("No user found with email:", email); // Debug logging
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Assuming passwords are stored as plain text for this example
    // Implement password hashing comparison here if using hashed passwords
    if (user.password !== password) {
      console.log("Password mismatch for user:", email); // Debug logging
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // If login successful
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
