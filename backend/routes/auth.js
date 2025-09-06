const passport = require('passport');
const express = require('express')
const router = express.Router()

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

module.exports = router