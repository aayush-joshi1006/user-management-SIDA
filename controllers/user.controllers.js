import { json } from "express";
import userModel from "../models/user.models.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error });
  }
};

export const getCurrentUser = async (req, res) => {
  const { currentId } = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error });
  }
};

export const addUser = async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (age <= 0 || age > 150) {
    return res.status(400).json({ message: "Enter a Valid age" });
  }

  try {
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "Email ID already existing try some other mail ID" });
    }

    const newUser = await userModel.create({
      name,
      email,
      age,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error });
  }
};

export const updateUser = async (req, res) => {};

export const deleteUser = async (req, res) => {};
