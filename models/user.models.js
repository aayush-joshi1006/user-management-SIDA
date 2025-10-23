import mongoose from "mongoose";

const userSchema = mongoose.userSchema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  age: { type: Number, required: true },
});

const userModel = mongoose.Model("User", userSchema);

export default userModel;
