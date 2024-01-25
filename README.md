# React + Vite

Este proyecto es una aplicación web desarrollada con React y Vite. La aplicación permite a los usuarios gestionar productos, incluyendo la adición, visualización y eliminación de productos.

## Funcionalidades

- **Adición de productos**: Los usuarios pueden añadir nuevos productos a la base de datos. Esto se realiza a través de un formulario que recoge los detalles del producto como el nombre, precio y stock.

- **Visualización de productos**: Los usuarios pueden ver una lista de todos los productos disponibles. Los productos se muestran en una tabla con columnas para el nombre del producto, precio y stock. También hay una columna de acciones donde los usuarios pueden eliminar el producto.

- **Eliminación de productos**: Los usuarios pueden eliminar productos de la base de datos. Esto se realiza a través de un botón de eliminar en la columna de acciones de la tabla de productos.

## Cómo funciona

La aplicación utiliza React para la interfaz de usuario y Vite para un desarrollo más rápido y un menor tiempo de construcción. Los datos de los productos se almacenan en una base de datos (especificar qué base de datos se utiliza). Cuando se añade un nuevo producto, se realiza una petición POST a la base de datos. Cuando se elimina un producto, se realiza una petición DELETE.

## Cómo se utiliza

1. Clona el repositorio en tu máquina local utilizando `git clone <url_del_repositorio>`.
2. Navega al directorio del proyecto con `cd <nombre_del_directorio>`.
3. Instala las dependencias con `npm install`.
4. Inicia el servidor de desarrollo con `npm run dev`.
5. Abre tu navegador y navega a `http://localhost:3000` para ver la aplicación.

## Herramientas utilizadas

- **React**: Una biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Una herramienta de construcción que proporciona un desarrollo más rápido y un menor tiempo de construcción.
- **Tailwind CSS**: Un marco de trabajo de CSS de utilidad primero para un desarrollo de diseño rápido.
- **Bootstrap**: Un marco de trabajo de CSS para desarrollar sitios web responsivos y móviles primero.
- **SweetAlert2**: Una biblioteca de JavaScript para crear alertas bonitas y personalizadas.
- **npm**: Un gestor de paquetes para JavaScript, utilizado para instalar y gestionar las dependencias del proyecto.
