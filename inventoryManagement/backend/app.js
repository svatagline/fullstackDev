import express from "express";
import router from "./routes/productRoutes.js";
import dbConnect from "./utils/dbConnect.js";

const app = express();

dbConnect();
//middleware
app.use(express.json());

app.use("/api/products", router);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

export default app;
