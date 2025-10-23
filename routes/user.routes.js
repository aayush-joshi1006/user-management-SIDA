import express from "express";

const userRoute = express.Router();

userRoute.get("/", getUsers);
userRoute.get("/id", getCurrentUser);
userRoute.post("/add", addUser);
userRoute.put("/update", updateUser);
userRoute.delete("/delete", deleteUser);

export default userRoute;
