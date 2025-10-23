import express from "express";
import {
  addUser,
  deleteUser,
  getCurrentUser,
  getUsers,
  updateUser,
} from "../controllers/user.controllers.js";

const userRoute = express.Router();

userRoute.get("/", getUsers);
userRoute.get("/:id", getCurrentUser);
userRoute.post("/add", addUser);
userRoute.put("/update/:id", updateUser);
userRoute.delete("/delete/:id", deleteUser);

export default userRoute;
