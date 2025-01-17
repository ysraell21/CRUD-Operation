const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 3000;
const mongodb_url =
  "mongodb+srv://yubertmariscal:tL8Tw6QLxOzA52tz@nodejs-crud-api.h58tv.mongodb.net/LYNX_HYPERMART?retryWrites=true&w=majority&appName=NodeJS-CRUD-API";

mongoose
  .connect(mongodb_url)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Node API is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));

// Default Route
app.get("/", (_, res) => {
  res.send("Welcome to LYNX Hypermart");
});

// Insert Product
app.post("/insert_product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Specific Product
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Specific Product
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id}` });
    }
    const updated_product = await Product.findById(id);
    res.status(200).json(updated_product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove Product
app.delete("/remove_product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any product with ID ${id}` });
    }
    const remaining_products = await Product.find({});
    res.status(200).json(remaining_products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
