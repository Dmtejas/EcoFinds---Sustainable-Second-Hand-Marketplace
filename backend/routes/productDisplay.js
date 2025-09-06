const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/productModel');
const verifyJWT = require('../middleware/verifyJWT'); // protect routes

// --- Multer setup for file uploads ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // folder to store uploaded images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });

// ------------------ ROUTES ------------------

// POST /api/products - create a new product listing
router.post(
  '/',
  verifyJWT,            // only logged-in users
  upload.array('itemImages', 5), // max 5 images
  async (req, res) => {
    try {
      const { itemTitle, itemCategory, itemCondition, itemDescription, itemPrice } = req.body;

      if (!itemTitle || !itemCategory || !itemCondition || !itemPrice) {
        return res.status(400).json({ error: "All required fields must be filled" });
      }

      const images = req.files ? req.files.map(file => file.filename) : [];

      const product = await Product.create({
        title: itemTitle,
        category: itemCategory,
        condition: itemCondition,
        description: itemDescription,
        price: Number(itemPrice),
        images,
        seller: req.user.id // comes from verifyJWT middleware
      });

      res.status(201).json({ message: "Product listed successfully", product });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// GET /api/products - fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;