const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const database = mongoose.connection;
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String, // Add this line
});

const Product = mongoose.model("Product", productSchema);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/products", upload.single("image"), async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.file.filename, // Save the filename
  });
  await newProduct.save();
  res.json(newProduct);
});

app.get("/products", async (req, res) => {
  const products = await Product.find();

  res.json(products);
});

const fs = require("fs");

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (product) {
    const imagePath = path.join(__dirname, "uploads", product.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Failed to delete image:", err);
      }
    });
  }

  res.json({ message: "Product deleted" });
});

app.use("/uploads", express.static("uploads"));

database.once("connected", () => {
  console.log("Database Connected");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});