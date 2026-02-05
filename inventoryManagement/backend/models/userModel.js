import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  role: Number,
  password: String,
  email: String,
  description: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
