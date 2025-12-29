import express from "express";
import Product from "../models/Product.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* =====================================================
   🔐 ADD PRODUCT (SELL) – SAFE & HARDENED
===================================================== */
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    // 🔐 Auth guard (prevents req.user crash)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { name, category, price, quantity, description, location } = req.body;

    // 🧪 Basic validation
    if (!name || !category || !price || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🖼 Image validation
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const product = await Product.create({
      farmer: req.user._id,
      name,
      category,
      price,
      quantity,
      description,
      location,
      image: req.file.path, // Cloudinary URL
      isAvailable: true,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   🔐 GET MY PRODUCTS (SELL PAGE)
===================================================== */
router.get("/my", protect, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const products = await Product.find({
      farmer: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("GET MY PRODUCTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   🌍 GET ALL PRODUCTS (MARKETPLACE)
===================================================== */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: true })
      .populate("farmer", "name phone location")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   🔐 DELETE PRODUCT (OWNER ONLY)
===================================================== */
router.delete("/:id", protect, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/* =====================================================
   🌍 GET SINGLE PRODUCT
===================================================== */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "farmer",
      "name phone location"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
