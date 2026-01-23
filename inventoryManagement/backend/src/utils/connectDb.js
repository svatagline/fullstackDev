//connectDb.js
import mongoose from "mongoose";
import { MONGO_URI } from "./constant.js";
import { errorLog, log } from "./function.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    log("MongoDB Connected");
  } catch (error) {
    errorLog("MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
