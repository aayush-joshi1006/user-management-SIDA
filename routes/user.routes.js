import express from "express";
import {
  addUser,
  deleteUser,
  getCurrentUser,
  getUsers,
  updateUser,
} from "../controllers/user.controllers.js";

// Create a new router for user routes
const userRoute = express.Router();

// Route to get all users
userRoute.get("/", getUsers);

// Route to get a specific user by ID
userRoute.get("/:id", getCurrentUser);

// Route to add a new user
userRoute.post("/add", addUser);

// Route to update an existing user by ID
userRoute.put("/update/:id", updateUser);

// Route to delete a user by ID
userRoute.delete("/delete/:id", deleteUser);

// Export the router so it can be used in the main app
export default userRoute;
