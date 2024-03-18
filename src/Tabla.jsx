import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import "./Tabla.css";

export default function Tabla() {
  const [data, setData] = useState([]);
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortArrow, setSortArrow] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const handleSort = (field) => {
    let direction = "asc";
    if (sortField === field && sortDirection === "asc") {
      direction = "desc";
    }
    setSortField(field);
    setSortDirection(direction);
    setSortArrow(!sortArrow);
  };

  let sortedProducts = [...data]; // Asume que 'products' es tu estado o prop con los datos de los productos.
  if (sortField !== null) {
    sortedProducts.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  }
  const [deleteProduct, setDeleteProduct] = useState("");
  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/sales/${deleteProduct}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log(`Producto: ${deleteProduct} eliminado`);
        Swal.fire({
          title: "Producto Eliminado",
          text: "",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#a5dc86",
          background: "#272727",
          customClass: {
            confirmButton: "sweet-alert-button",
            title: "sweet-alert-title",
            content: "sweet-alert-content",
          },
        }).then(() => {
          const deleteProductId = Number(deleteProduct);
          const newData = data.filter(
            (product) => product.id !== deleteProductId
          );
          setData(newData);

          // Comprueba si la página actual tiene datos
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          const currentPageData = newData.slice(startIndex, endIndex);

          // Si la página actual no tiene datos y no es la primera página, disminuye el número de la página actual en uno
          if (currentPageData.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ producto, precio, stock }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log(
          "Producto: " +
            producto +
            " Precio: " +
            precio +
            " Stock: " +
            stock +
            " añadido"
        );
        const newProduct = await response.json();
        console.log(newProduct);

        Swal.fire({
          title: "Producto Creado",
          text: "",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#a5dc86",
          background: "#272727",
          customClass: {
            confirmButton: "sweet-alert-button",
            title: "sweet-alert-title",
            content: "sweet-alert-content",
          },
        }).then(() => {
          setData([...data, newProduct]);
          setProducto("");
          setPrecio("");
          setStock("");
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetch("http://localhost:3000/sales")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  return (
    <div
      id="padre"
      className="bg-gray-700 w-max text-gray-300 rounded-md pl-6 pr-3 pt-4 pb-1"
    >
      <div className="flex justify-center items-center content-center w-max">
        <table>
          <thead>
            <tr className="bg-gray-800">
              <th onClick={() => handleSort("id")}>
                ID Producto
                {sortField === "id" ? (
                  sortDirection === "asc" ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )
                ) : (
                  <>
                    <ArrowUpwardIcon />
                    <ArrowDownwardIcon />
                  </>
                )}
              </th>
              <th onClick={() => handleSort("producto")}>
                Producto
                {sortField === "producto" ? (
                  sortDirection === "asc" ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )
                ) : (
                  <>
                    <ArrowUpwardIcon />
                    <ArrowDownwardIcon />
                  </>
                )}
              </th>
              <th onClick={() => handleSort("precio")}>
                Precio
                {sortField === "precio" ? (
                  sortDirection === "asc" ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )
                ) : (
                  <>
                    <ArrowUpwardIcon />
                    <ArrowDownwardIcon />
                  </>
                )}
              </th>
              <th onClick={() => handleSort("stock")}>
                Stock
                {sortField === "stock" ? (
                  sortDirection === "asc" ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <ArrowUpwardIcon />
                  )
                ) : (
                  <>
                    <ArrowUpwardIcon />
                    <ArrowDownwardIcon />
                  </>
                )}
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-500">
            {currentItems.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-700 transition-all"
              >
                <td>{product.id}</td>
                <td>{product.producto}</td>
                <td>{parseFloat(product.precio).toFixed(2)}€</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
          <div className="flex items-centerw-max mt-1">
          {currentPage > 1 && (
            <button onClick={() => setCurrentPage(currentPage - 1)}>
              <ArrowCircleLeftIcon />
            </button>
          )}
          <span className="px-2 bg-white text-black rounded-full ml-1 mr-1 mt-0.5">{currentPage}</span>
          {currentPage < totalPages && (
            <button onClick={() => setCurrentPage(currentPage + 1)}>
              <ArrowCircleRightIcon />
            </button>
          )}
          </div>
        </table>
      </div>
      <div className=" grid grid-cols-2 grid-rows-1 w-max gap-20">
        <div>
          <h3 className="text-2xl">
            <AddIcon />
            Nuevo Producto
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-2 ml-2">
              <label>
                Producto:
                <input
                  className="border-2 border-gray-500 rounded-md ml-4 p-1 text-black"
                  type="text"
                  value={producto}
                  onChange={(e) => setProducto(e.target.value)}
                />
              </label>
            </div>
            <div className="mt-2 ml-2">
              <label>
                Precio:
                <input
                  className="border-2 border-gray-500 rounded-md ml-9 p-1 text-black"
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </label>
            </div>
            <div className="mt-2 ml-2">
              <label>
                Stock:
                <input
                  className="border-2 border-gray-500 rounded-md ml-11 p-1 text-black"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </label>
            </div>
            <button
              className="bg-blue-300 p-2 rounded-md text-white hover:bg-blue-600 mt-6 ml-16"
              type="submit"
            >
              Agregar producto
            </button>
          </form>
        </div>
        <div id="deleteForm">
          <h3 className="text-2xl">
            <DeleteForeverIcon />
            Eliminar Producto
          </h3>
          <form onSubmit={handleDelete}>
            <div className="mt-2 ml-2">
              <label>
                ID Producto:
                <input
                  className="border-2 border-gray-500 rounded-md ml-4 p-1 text-black"
                  type="text"
                  value={deleteProduct}
                  onChange={(e) => setDeleteProduct(e.target.value)}
                />
              </label>
            </div>
            <button
              className="bg-red-300 p-2 rounded-md text-white hover:bg-red-600 mt-6 ml-16"
              type="submit"
            >
              Eliminar producto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
