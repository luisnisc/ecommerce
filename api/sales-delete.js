// api/sales-delete.js
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
  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      const product = await Product.findOneAndDelete({ id: id });
      if (!product) {
        return res
          .status(404)
          .json({ message: `Producto con id: ${id} no encontrado` });
      }
      res.json({ message: `Producto: ${id} eliminado` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el producto" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
};