// api/sales.js
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
  if (req.method === 'GET') {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los productos" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
};