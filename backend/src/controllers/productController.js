import Product from "../models/Product.js";

/**
 * @desc    Add new product
 * @route   POST /api/products
 * @access  Private
 */
export const addProduct = async (req, res) => {
  try {
    // 🔐 Auth safety
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { name, category, price, quantity, description, location } = req.body;

    // 🧪 Basic validation
    if (!name || !category || !price || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🖼 Image is mandatory
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
      image: req.file.path,
      isAvailable: true,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: true })
      .populate("farmer", "name location phone")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("GET ALL PRODUCTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get logged-in farmer's products
 * @route   GET /api/products/my
 * @access  Private
 */
export const getMyProducts = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const products = await Product.find({
      farmer: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("GET MY PRODUCTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private
 */
export const deleteProduct = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.farmer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
