import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({path: '../../.env'});
const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI);

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  producto: String,
  precio: Number,
  stock: Number
}, { collection: 'sales' });

const Product = mongoose.model('Product', productSchema, 'sales');

app.get('/sales', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});
app.post('/sales', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const newProduct = new Product({
      id: count + 1,
      producto: req.body.producto,
      precio: req.body.precio,
      stock: req.body.stock
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al añadir el producto' });
  }
});

app.delete('/sales/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneAndDelete({ id: id });
    if (!product) {
      return res.status(404).json({ message: `Producto con id: ${id} no encontrado` });
    }
    res.json({ message: `Producto: ${id} eliminado` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 