const Product = require("../models/productModel");

// Get All Products
const getAllProducts = async (_, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Insert Multiple Products
const insertMultipleProducts = async (req, res) => {
  try {
    const products = await Product.insertMany(req.body);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Insert a Product
const insertProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Specific Product
const getSpecificProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id}` });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Specific Product
const updateSpecificProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product)
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id}` });
    const updated_product = await Product.findById(id);
    res.status(200).json(updated_product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove Specific Product
const removeSpecificProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id}` });
    const remaining_products = await Product.find({});
    res.status(200).json(remaining_products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  insertMultipleProducts,
  insertProduct,
  getSpecificProduct,
  updateSpecificProduct,
  removeSpecificProduct,
};
