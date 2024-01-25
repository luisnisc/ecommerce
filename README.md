# Aplicación de Inventario de Tienda E-commerce

Esta aplicación simula el inventario de una tienda e-commerce. Permite a los usuarios gestionar productos, incluyendo la adición, visualización y eliminación de productos. La aplicación funciona con un servidor intermediario que se comunica con una base de datos MySQL.

## Funcionalidades

- **Adición de productos**: Los usuarios pueden añadir nuevos productos a la base de datos. Esto se realiza a través de un formulario que recoge los detalles del producto como el nombre, precio y stock. Cuando se envía el formulario, se realiza una petición POST al servidor, que luego añade el producto a la base de datos MySQL.

- **Visualización de productos**: Los usuarios pueden ver una lista de todos los productos disponibles. Los productos se muestran en una tabla con columnas para el nombre del producto, precio y stock. La tabla se actualiza automáticamente cuando se añade o se elimina un producto.

- **Eliminación de productos**: Los usuarios pueden eliminar productos de la base de datos. Esto se realiza a través de un botón de eliminar en la columna de acciones de la tabla de productos. Cuando se presiona el botón, se realiza una petición DELETE al servidor, que luego elimina el producto de la base de datos MySQL.

## Cómo funciona

La aplicación utiliza React para la interfaz de usuario y Vite para un desarrollo más rápido y un menor tiempo de construcción. Los datos de los productos se almacenan en una base de datos MySQL. La aplicación se comunica con la base de datos a través de un servidor intermediario, que maneja las peticiones POST y DELETE.

## Cómo se utiliza

1. Clona el repositorio en tu máquina local utilizando `git clone https://github.com/luisnisc/ecommerce.git`.
2. Navega al directorio del proyecto con `cd ecommerce`.
3. Instala las dependencias con `npm install`.
4. Inicia el servidor de desarrollo con `npm run dev`.
5. Abre tu navegador y navega a `http://localhost:5173` para ver la aplicación.

## Herramientas utilizadas

- **React**: Una biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Una herramienta de construcción que proporciona un desarrollo más rápido y un menor tiempo de construcción.
- **Tailwind CSS**: Un marco de trabajo de CSS de utilidad para un desarrollo de diseño rápido.
- **Bootstrap**: Un marco de trabajo de CSS para desarrollar sitios web responsivos y móviles.
- **SweetAlert2**: Una biblioteca de JavaScript para crear alertas bonitas y personalizadas.
- **npm**: Un gestor de paquetes para JavaScript, utilizado para instalar y gestionar las dependencias del proyecto.
- **MySQL**: Un sistema de gestión de bases de datos relacional utilizado para almacenar los datos de los productos.
