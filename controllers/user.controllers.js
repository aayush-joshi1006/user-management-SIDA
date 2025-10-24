import userModel from "../models/user.models.js";
import mongoose from "mongoose";

// Get all users from the database
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a single user by id
export const getCurrentUser = async (req, res) => {
  const currentId = req.params.id;

  // Check if the id format is valid
  if (!mongoose.Types.ObjectId.isValid(currentId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }
  try {
    const user = await userModel.findById(currentId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a new user
export const addUser = async (req, res) => {
  const { name, email, age } = req.body;

  // Check if all fields are given
  if (!name || !email || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Check for valid age
  const parsedAge = Number(age);
  if (isNaN(parsedAge) || parsedAge < 1 || parsedAge > 120) {
    return res.status(400).json({ message: "Enter a valid age" });
  }

  try {
    // Check if email already exists
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Create new user
    const newUser = await userModel.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      age: parsedAge,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update an existing user by id
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, age, email } = req.body;

  // Check if id is valid
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  // Do not allow email updates
  if (email) {
    return res.status(400).json({ message: "Email cannot be updated" });
  }

  // Prepare update fields
  const updatedFields = {};
  if (name && typeof name === "string") updatedFields.name = name.trim();
  if (age) {
    if (isNaN(age) || age < 1 || age > 120) {
      return res.status(400).json({ message: "Invalid age" });
    }
    updatedFields.age = age;
  }

  // If no fields to update
  if (Object.keys(updatedFields).length === 0) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  try {
    // Update user in database
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({
      message: "User Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a user by id
export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  // Check if id is valid
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    // Delete user from database
    const deletedUser = await userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
