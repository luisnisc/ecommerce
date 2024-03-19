import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

import "./Tabla.css";

/**
 * Componente de tabla que muestra una lista de productos.
 * @returns {JSX.Element} Elemento JSX que representa la tabla de productos.
 */
export default function Tabla() {
  const [data, setData] = useState([]);
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [editProducto, setEditProducto] = useState("");
  const [editPrecio, setEditPrecio] = useState("");
  const [editStock, setEditStock] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortArrow, setSortArrow] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  /**
   * Maneja el ordenamiento de la tabla por un campo específico.
   * @param {string} field - El campo por el cual se va a ordenar la tabla.
   */
  const handleSort = (field) => {
    let direction = "asc";
    if (sortField === field && sortDirection === "asc") {
      direction = "desc";
    }
    setSortField(field);
    setSortDirection(direction);
    setSortArrow(!sortArrow);
  };

  // Ordena los productos en base al campo seleccionado y la dirección de ordenamiento
  let sortedProducts = [...data];
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

  /**
   * Maneja la eliminación de un producto.
   * @param {Event} event - El evento de click del botón de eliminar.
   */
  const handleDelete = async (id) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/sales/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html: '<p style="color: #ffffff;">Algo a salido mal!</p>', // Cambia el color aquí
          footer: '<p style="color: #ffffff;">Producto no encontrado</p>', // Cambia el color aquí
          confirmButtonText: "OK",
          confirmButtonColor: "#de6d6d",
          background: "#272727",
          customClass: {
            confirmButton: "sweet-alert-button",
            title: "sweet-alert-title",
            content: "sweet-alert-content",
          },
        });
      } else {
        console.log(`Producto: ${id} eliminado`);

        // Muestra una alerta de éxito y actualiza los datos de la tabla
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
          const deleteProductId = Number(id);
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
  const [update, setUpdate] = useState(false);
  const [editProduct, setEditProduct] = useState("");
  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const body = {
        producto: editProducto,
        precio: editPrecio,
        stock: editStock,
      };
      Object.keys(body).forEach((key) => body[key] === "" && delete body[key]);

      const response = await fetch(
        `http://localhost:3000/sales/${editProduct}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
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
            " editado"
        );
        const newProduct = await response.json();
        console.log(newProduct);

        // Muestra una alerta de éxito y actualiza los datos de la tabla
        Swal.fire({
          title: "Producto Editado",
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
          // Cambia el estado 'update' para forzar una actualización de la tabla
          setUpdate(!update);
          setEditProduct("");
          setEditProducto("");
          setEditPrecio("");
          setEditStock("");
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

        // Muestra una alerta de éxito y actualiza los datos de la tabla
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

  // Obtiene los datos de los productos al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/sales");
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, [update]);

  // Calcula los índices de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div
      id="padre"
      className="bg-gray-700 w-max text-gray-300 rounded-md pl-6 pr-3 pt-4 pb-1 min-h-max"
    >
      <div className="flex justify-center items-center content-center w-max ">
        <table>
          <thead>
            <tr className="bg-gray-800">
              <th className="w-2"></th>
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
                <td>
                  <button onClick={() => handleDelete(product.id)}>
                    <DeleteForeverIcon
                      sx={{
                        "&:hover": {
                          color: "red",
                        },
                      }}
                    />
                  </button>
                </td>
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
            <span
              id="currentPage"
              className="px-2 bg-white text-black rounded-full ml-1 mr-1 mt-0.5"
            >
              {currentPage}
            </span>
            {currentPage < totalPages && (
              <button onClick={() => setCurrentPage(currentPage + 1)}>
                <ArrowCircleRightIcon />
              </button>
            )}
          </div>
        </table>
      </div>
      <div className=" grid grid-cols-2 grid-rows-1 w-max gap-20 pb-4">
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
              className="bg-green-300 p-2 rounded-md text-white hover:bg-green-600 mt-6 ml-16"
              type="submit"
            >
              Agregar producto
            </button>
          </form>
        </div>
        <div
          id="editForm"
          className=""
        >
          <h3 className="text-2xl">
            <EditIcon />
            Editar Producto
          </h3>
          <form onSubmit={handleEdit}>
            <div className="mt-2 ml-2 flex flex-col">
              <label>
                ID Producto:
                <input
                  className="border-2 border-gray-500 rounded-md ml-4 p-1 text-black "
                  type="text"
                  required={true}
                  value={editProduct}
                  onChange={(e) => setEditProduct(e.target.value)}
                />
              </label>
              <label>
                Nuevo Nombre:
                <input
                  className="border-2 border-gray-500 rounded-md ml-4 p-1 text-black mt-2"
                  type="text"
                  value={editProducto}
                  onChange={(e) => setEditProducto(e.target.value)}
                />
              </label>
              <label>
                Nuevo Precio:
                <input
                  className="border-2 border-gray-500 rounded-md ml-4 p-1 text-black mt-2"
                  type="number"
                  value={editPrecio}
                  onChange={(e) => setEditPrecio(e.target.value)}
                />
              </label>
              <label>
                Nuevo Stock:
                <input
                  className="border-2 border-gray-500 rounded-md ml-4 p-1 text-black mt-2"
                  type="number"
                  value={editStock}
                  onChange={(e) => setEditStock(e.target.value)}
                />
              </label>
            </div>
            <button
              className="bg-blue-300 p-2 rounded-md text-white hover:bg-blue-600 mt-6 ml-16"
              type="submit"
            >
              Guardar cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
