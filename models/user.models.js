import mongoose from "mongoose";

// Define the structure for the user collection
const userSchema = mongoose.Schema({
  // Name field is required and must be a string
  name: { type: String, required: true },

  // Email field must be unique and required
  email: { type: String, unique: true, required: true },

  // Age field is required and must be a number
  age: { type: Number, required: true },
});

// Create a model using the user schema
const userModel = mongoose.model("User", userSchema);

// Export the model so it can be used in other files
export default userModel;
