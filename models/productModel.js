const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    product_name: {
      type: String,
      required: [true, "Please enter a product name: "],
    },
    product_quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    product_price: {
      type: Number,
      required: [true, "Please enter the price: "],
    },
    product_image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product; 