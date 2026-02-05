import express from "express";
import router from "./routes/productRoutes.js";
import dbConnect from "./utils/dbConnect.js";
import cors from "cors";

const app = express();
// Source - https://stackoverflow.com/a/49032117
// Posted by user7364588
// Retrieved 2026-02-05, License - CC BY-SA 3.0

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

dbConnect();
//middleware
app.use(express.json());

app.use("/api/products", router);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

export default app;
