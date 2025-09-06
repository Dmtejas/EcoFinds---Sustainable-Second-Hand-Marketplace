const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
console.log("MONGO_URI:", process.env.MONGO_URI);


connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/user', require('./routes/userLogin'))
app.use(errorHandler);
app.listen(PORT, (err) => {
    if(err) {
        console.log("Error connecting to the server");
    } 
    else {
        console.log(`Server is running at PORT ${PORT}`)
    }
})