// server.js
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./utils/connectDb.js";
import { PORT } from "./utils/constant.js";

dotenv.config();
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
