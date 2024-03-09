require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const connectDb=require("../Db/Db.js")

const Waste = require("../models/Waste.js");
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

// const Product=require("../models/product.js")

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Token is invalid or expired" });
      }
      req.user = decoded; // Add decoded token payload to request object
      next();
    });
  } else {
    res.status(401).json({ error: "A token is required for authentication" });
  }
};

// Register User
router.post("/register", async (req, res) => {
  const { fname, lname, email, password,usertype } = req.body;

  if (!fname || !lname || !email || !password || !usertype) {
    return res.status(400).json({ error: "Please fill all required fields" });
  }

  try {
    await connectDb();
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
      usertype
    });

    await user.save();
    const token = jwt.sign({ userId: user._id, usertype }, JWT_SECRET, {
      expiresIn: "12h",
    });
    res.status(201).json({ token });
    //res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  try {
    await connectDb();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const tokenPayload = {
      userId: user._id,
      usertype: user.usertype,
      firstName: user.fname, // Add the first name to the token payload
    };


    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: "12h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/submit", async (req, res) => {
  const { name, contactno, address, pincode, email, pickupdate, typeofwaste } =
    req.body;

  try {
    const waste = new Waste({
      name,
      contactno,
      address,
      pincode,
      email,
      pickupdate,
      typeofwaste,
    });

    await waste.save();

    res.status(201).json({ message: "data saved" });
  } catch (err) {
    console.log(err);
  }
});

router.get("/user",async(req,res)=>{
  try{
    await connectDb();
  const userdata=await Waste.find();
  if(userdata.length>0){
    res.status(200).json(userdata)
  }
  else{
    res.status(404).json({message:"no data found"})
  }
}
catch(err){
  console.error(err);
  res.status(500).json({message:"internal server error"})
}
});



//forget password
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

//Get user details after login
router.get("/userdetails", verifyToken, async (req, res) => {
  try {
    await connectDb();
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      firstName: user.fname,
      lastName: user.lname,
      email: user.email,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});

// Update User Profile (firstName, lastName, email)

router.put("/updateProfile", verifyToken, async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.fname = firstName;
    user.lname = lastName;
    user.email = email;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Change password
router.put("/updatePassword", verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;
    console.log(currentPassword);

    // Fetch user from the database
    const user = await User.findById(userId); // Check if the current password provided by the user matches the one in the database
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Return success response
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;
