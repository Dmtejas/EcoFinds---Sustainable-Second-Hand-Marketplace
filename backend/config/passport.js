const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Replace these with your actual credentials
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback" // full URL
  },
  function(accessToken, refreshToken, profile, done) {
    const user = {
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value
    };
    user.token = "dummy-jwt"; // or generate real JWT
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
