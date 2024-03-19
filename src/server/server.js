/**
 * Dependencias del módulo.
 */
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());

/**
 * Esquema del producto.
 * @typedef {Object} Producto
 * @property {number} id - El identificador único para el producto.
 * @property {string} producto - El nombre del producto.
 * @property {number} precio - El precio del producto.
 * @property {number} stock - La cantidad de stock del producto.
 */

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

/**
 * Obtener todos los productos.
 * @route GET /sales
 * @returns {Producto[]} - Un array de productos.
 * @throws {Error} - Si hay un error al recuperar los productos.
 */
app.get("/sales", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
});

/**
 * Añadir un nuevo producto.
 * @route POST /sales
 * @param {Producto} req.body - El producto a añadir.
 * @returns {Producto} - El producto recién añadido.
 * @throws {Error} - Si hay un error al añadir el producto.
 */
app.post("/sales", async (req, res) => {
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
});

/**
 * Eliminar un producto por ID.
 * @route DELETE /sales/:id
 * @param {number} req.params.id - El ID del producto a eliminar.
 * @returns {Object} - Un mensaje indicando el éxito de la eliminación.
 * @throws {Error} - Si hay un error al eliminar el producto.
 */
app.delete("/sales/:id", async (req, res) => {
  const { id } = req.params;
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
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
