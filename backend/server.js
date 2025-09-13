const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const path = require("path");
const passport = require('passport');
require('./config/passport'); // your Google strategy setup
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
console.log("MONGO_URI:", process.env.MONGO_URI);

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);

// Serve static files from frontend folder

app.use(express.static(path.join(__dirname, "../frontend")));
// For all other routes, serve index.html (optional for SPA)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/commerce.html"));
});

app.use(passport.initialize());

app.use('/api/user', require('./routes/userLogin'))
app.use("/api/auth", require("./routes/auth"));
app.use('/api/products', require("./routes/productDisplay"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(errorHandler);
app.listen(PORT, (err) => {
    if (err) {
        console.log("Error connecting to the server");
    } else {
        console.log(`Server is running at PORT ${PORT}`)
    }
})