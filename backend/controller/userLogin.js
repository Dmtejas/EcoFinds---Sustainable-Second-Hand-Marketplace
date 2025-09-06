// @desc   User signup
// @route  POST /api/user/signup
// @access Public
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const path = require("path"); 

const signupHandler = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // 1. Validate input
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // 2. Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Save user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // 5. Response
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});


const loginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("📩 Login attempt:", { email, password }); // Debug

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });
  console.log("🔍 Found user:", user); // Debug

  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("✅ Password match:", isMatch); // Debug

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  console.log(`token: ${token}`)

  res.status(200).json({
    message: "Login successful",
    token,
    user: { id: user._id, username: user.username, email: user.email },
  });
});


const showHome = asyncHandler(async (req, res) => {
   res.sendFile(path.join(__dirname, "../../frontend/home.html"));
})


module.exports = { signupHandler, loginHandler, showHome };
