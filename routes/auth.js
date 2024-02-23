const express = require("express");

const router = express.Router();

require("../Db/Db");
const User = require("../models/User");
const Waste = require("../models/Waste.js");

router.post("/register", async (req, res) => {
  const { fname, lname, email, password, cpassword,usertype } = req.body; // destructing

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!fname || !lname || !email || !password || !cpassword||!usertype) {
    return res.status(422).json({ error: "plz fill these filed" });
  }
  if (!email.includes("@")) {
    return res.status(422).json({ error: "Invalid email format" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(422).json({
      error:
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }

  if (password !== cpassword) {
    return res.status(422).json({ error: "Passwords do not match" });
  }

  try {
    const userexists = await User.findOne({ email: email }); // User is get from const User = require("../models/User");

    if (userexists) {
      return res.status(422).json({ error: "email alredy exits" });
    }

    const user = new User({ fname, lname, email, password, cpassword,usertype }); //if key value same then no need to mention key :value

    await user.save();

    res.status(201).json({ message: "data saved" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Return the complete user object
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/submit", async (req, res) => {
  const { name, contactno, address, pincode, email, pickupdate, typeofwaste } =
    req.body; // destructing

  try {
    const waste = new Waste({
      name,
      contactno,
      address,
      pincode,
      email,
      pickupdate,
      typeofwaste,
    }); //if key value same then no need to mention key :value

    await waste.save();

    res.status(201).json({ message: "data saved" });
  } catch (err) {
    console.log(err);
  }
});



//update password

router.post("/forgotpass", async (req, res) => {
  const { email, password, cpassword } = req.body;

  try {
    // Check if the user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email id not exist" });
    }

    // You might want to validate the password and cpassword here

    // Update user password
    user.password = password;
    user.cpassword = cpassword;
    if (password != cpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    }
    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Route to update waste details

// routes to fetch username from given email
router.get("/register/:email", async (req, res) => {
  const userEmail = req.params.email;

  try {
    // Find the user by email in the database
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user data
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
