import express from "express";
import Product from "../models/Product.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* =====================================================
   🔐 ADD PRODUCT (SELL) – WITH IMAGE UPLOAD
===================================================== */
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, quantity, description, location } = req.body;

    const product = await Product.create({
      farmer: req.user._id,
      name,
      category,
      price,
      quantity,
      description,
      location,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
});

/* =====================================================
   🔐 GET MY PRODUCTS (SELL PAGE)
   MUST come before /:id
===================================================== */
router.get("/my", protect, async (req, res) => {
  try {
    const products = await Product.find({
      farmer: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your products" });
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
    res.status(500).json({ message: "Failed to fetch products" });
  }
});
/* =====================================================
   🔐 DELETE PRODUCT (OWNER ONLY)
===================================================== */
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔐 Ensure only owner can delete
    if (product.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Failed to delete product" });
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
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

export default router;
