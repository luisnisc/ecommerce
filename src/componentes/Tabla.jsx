import { useState, useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import FormularioCreacion from "./formularios/FormularioCreacion";
import FormularioEdicion from "./formularios/FormularioEdicion";
import Swal from "sweetalert2";

import "./Tabla.css";

/**
 * Componente de tabla que muestra una lista de productos.
 * @returns {JSX.Element} Elemento JSX que representa la tabla de productos.
 */
export default function Tabla() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [sortField, setSortField] = useState("id");
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
   * Exporta los datos obtenidos en el GET a un archivo JSON.
   */
  const exportToJson = () => {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    link.click();
  };
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

  // Obtiene los datos de los productos al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/sales");
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  // Calcula los índices de los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div
      id="padre"
      className="bg-gray-700 text-gray-300 rounded-md pl-6 pr-6 pt-4 pb-1 min-h-max"
    >
       <button className="bg-blue-300 p-2 rounded-md text-white hover:bg-blue-600 mb-4" onClick={exportToJson}>Exportar a JSON</button>
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
        <FormularioCreacion setData={setData} />
        <FormularioEdicion
          setData={setData}
          setUpdate={setUpdate}
          update={update}
        />
      </div>
    </div>
  );
}
