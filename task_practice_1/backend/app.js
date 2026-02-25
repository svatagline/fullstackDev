const express = require("express");
const app = express();
const productRouter = require("./src/routes/product-routes");
const orderRouter = require("./src/routes/order-routes");
const authRouter = require("./src/routes/auth-routes");
const connectDB = require("./src/utils/connectDb");
const authenticateToken = require("./src/utils/middleware/authMiddleware");
var cors = require('cors')

// Configure the allowed origin
const corsOptions = {
    origin: 'http://localhost:3000', // Explicitly allow only this origin
    credentials: true, // Needed if your app uses cookies or sessions
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));
//middleware
app.use(express.json());

connectDB()
app.use("/api/products", authenticateToken, productRouter);
app.use("/api/orders", authenticateToken, orderRouter);
app.use("/api/auth", authRouter);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

module.exports = app;
