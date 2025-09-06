const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    // Pass error to global errorHandler
    throw new Error(`MongoDB connection failed: ${err.message}`);
  }
};

module.exports = connectDB;
