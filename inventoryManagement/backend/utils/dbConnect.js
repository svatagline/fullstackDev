import mongoose from "mongoose";
import { errorLog, log } from "./function.js";
//configure mongoose

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sagar:SagarM%40123@fullstakedevpractice.mu5ssib.mongodb.net/inventory",
    );
    log("Connected to MongoDB");
  } catch (error) {
    errorLog("MongoDB connection => ", error);
  }
};

export default dbConnect;
