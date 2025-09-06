// @desc   User signup
// @route  POST /api/user/signup
// @access Public
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

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

module.exports = { signupHandler };
