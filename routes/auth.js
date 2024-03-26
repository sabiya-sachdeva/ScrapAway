require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.static("public"));

// app.use('/api', require('./uploads'));


const bcrypt = require("bcrypt");
const multer = require("multer");

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const connectDb = require("../Db/Db.js");

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
  const { fname, lname, email, password, usertype,agreedToPrivacy } = req.body;

  if (!fname || !lname || !email || !password || !usertype||!agreedToPrivacy) {
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
      usertype,
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
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
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

const path = require("path");

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, './uploads');
    cb(null, "uploads"); // Save uploaded files to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename uploaded files with a unique name
  },
});

const upload = multer({ storage: storage });

router.post("/submit", upload.single("image"), async (req, res) => {
  // const { name, contactno, address, pincode, email, pickupdate, typeofwaste } =
  //   req.body;

    const { typeofwaste,address, pincode,contactno, pickupdate} =
    req.body;
  const imagePath = req.file ? req.file.path : ""; // Check if req.file exists

  try {
    await connectDb();
    const waste = new Waste({
      // user: req.user.userId,
      typeofwaste,
      imagePath,
      address,
      pincode,
      contactno,
      pickupdate,
    
      // ObjectId of the user
    });

    await waste.save();

    res.status(201).json({ message: "data saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const uploadsPath = path.join(__dirname, "..", "uploads"); // Assuming the uploads folder is located at the root level of your project

router.use("/uploads", express.static(uploadsPath));
// router.use('/uploads',express.static('uploads'))
router.get("/user", async (req, res) => {
  try {
    await connectDb();
    const userdata = await Waste.find();
    console.log(userdata);

    if (!userdata) {
      // Handle case where no data is found
      return res.status(404).json({ message: "No user data found" });
    }

    const usersWithImageUrl = userdata.map((user) => {
      return {
        ...user._doc,
        imagePath: `/uploads/${user.imagePath}`,

        // Modify imagePath to contain the URL
      };
    });

    res.json(usersWithImageUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//forget password
// router.post("/forgotpass", async (req, res) => {
//   const { email, password, confirmPassword} = req.body;

//   try {
//     // Check if the user exists with the provided email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: "Email id not exist" });
//     }

//     // You might want to validate the password and cpassword here

//     // Update user password
//     user.password = newPassword;
//     user.confirmPassword = confirmPassword;
//     if (password != cpassword) {
//       return res.status(422).json({ error: "Passwords do not match" });
//     }
//     // Save the updated user
//     await user.save();

//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error("Error updating password:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

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

router.get("/searchwaste", async (req, res) => {
  const { types } = req.query; // "types" will be a comma-separated string of selected waste types
  try {
    await connectDb();
    let query = {};

    if (types) {
      const typesArray = types.split(","); // Convert the string into an array of types
      query.typeofwaste = { $in: typesArray };
    }

    const filteredData = await Waste.find(query);

    // Format imagePath to contain the URL
    const filteredDataWithImageUrl = filteredData.map((user) => ({
      ...user._doc,
      imagePath: `/uploads/${user.imagePath}`,
    }));

    res.json(filteredDataWithImageUrl);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/forgotpass", async (req, res) => {
  const { email, currentPassword, newPassword, confirmPassword } = req.body;

  try {
    await connectDb();
    // Check if the user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Email id not exist" });
    }

    // Verify the current password
    // const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    // if (!isPasswordMatch) {
    //   return res.status(400).json({ error: "Current password is incorrect" });
    // }

    // Validate the new password and confirm password
    if (newPassword !== confirmPassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password with the hashed new password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





// router.post('/uploadImage', upload.single('profileImage'), async (req, res) => {
//   try {
//     // Assuming the user is authenticated and user data is available in req.user
//     const { userId } = req.user; // Assuming you have stored user ID in req.user after authentication

//     if (!req.file) {
//       return res.status(400).json({ message: 'No image uploaded' });
//     }

//     // Update user's profile image path in the database
//     const imagePath = req.file.filename;
//     await User.findByIdAndUpdate(userId, { profileimg: imagePath });

//     res.json({ imagePath: `/uploads/${imagePath}` });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


module.exports = router;
