// api/sales-put.js
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
  if (req.method === 'PUT') {
    const { id } = req.query;
    const update = req.body; // Aquí asumimos que los cambios vienen en el cuerpo de la solicitud
    try {
      const product = await Product.findOneAndUpdate({ id: id }, update, { new: true }); // { new: true } devuelve el documento actualizado

      if (!product) {
        return res
          .status(404)
          .json({ message: `Producto con id: ${id} no encontrado` });
      }

      res.json({ message: `Producto: ${id} actualizado`, product: product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el producto" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
};