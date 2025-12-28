import Product from "../models/Product.js";

/**
 * @desc    Add new product
 * @route   POST /api/products
 * @access  Private
 */
export const addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      farmer: req.user._id,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
      location: req.body.location,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json(product);
  } catch (error) {
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
    const products = await Product.find()
      .populate("farmer", "name location phone")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
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
    const products = await Product.find({ farmer: req.user._id });
    res.json(products);
  } catch (error) {
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
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.farmer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
