const express = require("express");
const mongoose = require("mongoose");
const {
  getAllProducts,
  getSpecificProduct,
  insertMultipleProducts,
  insertProduct,
  removeSpecificProduct,
  updateSpecificProduct,
  deleteMultipleProducts
} = require("./controllers/productController");

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

app.get("/products", getAllProducts);
app.get("/products/:id", getSpecificProduct);
app.post("/products/insert", insertProduct);
app.post("/products/insert-multiple-products", insertMultipleProducts);
app.put("/products/:id", updateSpecificProduct);
app.delete("/products/:id", removeSpecificProduct);
app.post("/products/delete-multiple-products", deleteMultipleProducts);