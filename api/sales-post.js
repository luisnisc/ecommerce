// api/sales-post.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    producto: String,
    precio: Number,
    stock: Number,
  },
  { collection: "sales" }
);

const Product = mongoose.model("Product", productSchema, "sales");

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const count = await Product.countDocuments();
      const newProduct = new Product({
        id: count + 1,
        producto: req.body.producto,
        precio: req.body.precio,
        stock: req.body.stock,
      });
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al añadir el producto" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
};