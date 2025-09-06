const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Item title is required"],
    trim: true
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["furniture", "electronics", "fashion", "books", "homegoods", "other"]
  },
  condition: {
    type: String,
    required: [true, "Condition is required"],
    enum: ["new", "like-new", "good", "fair"]
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: 0
  },
  images: {
    type: [String], // Array of image URLs or filenames
    default: []
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
