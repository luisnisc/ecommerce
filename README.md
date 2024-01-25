# E-commerce Store Inventory Application
This application simulates the inventory of an e-commerce store. It allows users to manage products, including adding, viewing, and deleting products. The application operates with an intermediary server that communicates with a MySQL database.

## Features
- **Product Addition**: Users can add new products to the database. This is done through a form that collects product details such as name, price, and stock. When the form is submitted, a POST request is made to the server, which then adds the product to the MySQL database.

- **Product Viewing**: Users can view a list of all available products. The products are displayed in a table with columns for product name, price, and stock. The table automatically updates when a product is added or deleted.

- **Product Deletion**: Users can delete products from the database. This is done through a delete button in the actions column of the product table. When the button is pressed, a DELETE request is made to the server, which then removes the product from the MySQL database.

## How it Works
The application uses React for the user interface and Vite for faster development and shorter build time. The product data is stored in a MySQL database. The application communicates with the database through an intermediary server, which handles POST and DELETE requests.

## How to Use
1. Clone the repository to your local machine using `git clone <repository_url>`.
2. Navigate to the project directory with `cd ecommerce`.
3. Install the dependencies with `npm install`.
4. Start the development server with `npm run dev`.
5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Tools Used
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides faster development and shorter build time.
- **Tailwind CSS**: A utility-first CSS framework for rapid design development.
- **Bootstrap**: A CSS framework for developing responsive and mobile-first websites.
- **SweetAlert2**: A JavaScript library for creating beautiful and customized alerts.
- **npm**: A package manager for JavaScript, used to install and manage project dependencies.
- **MySQL**: A relational database management system used to store product data.
