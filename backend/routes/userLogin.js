const express = require('express');
const router = express.Router()
const passport = require("passport");
const { signupHandler, loginHandler, showHome } = require('../controller/userLogin');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/signup').post(signupHandler)

router.route('/login').post(loginHandler)

// Start Google OAuth login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login.html" }),
  (req, res) => {
    // Generate JWT token already in passport strategy
    const token = req.user.token;

    // Redirect to frontend with token
    res.redirect(`/login.html?token=${token}`);
  }
);

router.route('/home').get(verifyJWT, showHome);
module.exports = router