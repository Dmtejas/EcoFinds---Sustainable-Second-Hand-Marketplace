const express = require('express');
const dotenv = require('dotenv');
const path = require("path");

const passport = require('passport');
require('./config/passport'); // your Google strategy setup


dotenv.config();
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
console.log("MONGO_URI:", process.env.MONGO_URI);



connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

// For all other routes, serve index.html (optional for SPA)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});
app.use(passport.initialize());
app.use(express.json());
app.use('/api/user', require('./routes/userLogin'))
app.use("/api/auth", require("./routes/auth"));

app.use(errorHandler);
app.listen(PORT, (err) => {
    if(err) {
        console.log("Error connecting to the server");
    } 
    else {
        console.log(`Server is running at PORT ${PORT}`)
    }
})