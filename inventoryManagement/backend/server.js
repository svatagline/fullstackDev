// fileName : server.js
// Example using the http module
// Include route files
import express from "express";
import productsRoute from "./routes/products.js";
import http from "http";

// Create an HTTP server
const app = express();

// Specify the port to listen on

// Use routes
app.use("/products", productsRoute);
const port = 5500;

// Start the server
app.listen(port, () => {
  console.log(`Node.js HTTP server is running on port ${port}`);
});
