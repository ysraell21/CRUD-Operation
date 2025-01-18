const Product = require("../models/productModel");
const mongoose = require("mongoose");

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
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Multiple Products
const deleteMultipleProducts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (ids.length === 0)
      return res.status(400).json({ message: "IDs array is empty" });
    const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
    if (validIds.length === 0)
      return res.status(400).json({ message: "IDs array is invalid" });
    const existingProducts = await Product.find({ _id: { $in: validIds } });
    const existingIds = existingProducts.map((product) =>
      product._id.toString()
    );
    const notFoundIds = validIds.filter((id) => !existingIds.includes(id));
    await Product.deleteMany({ _id: { $in: validIds } });

    const response = {
      message: "Products deleted successfully",
      deletedIds: existingIds,
    };
    if (notFoundIds.length > 0) {
      response.notFoundIds = notFoundIds;
      response.error = `The following IDs were not found: ${notFoundIds.join(
        ", "
      )}`;
    }
    res.status(200).json(response);
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
  deleteMultipleProducts,
};
