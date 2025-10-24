import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Create an express application
const app = express();

// Define the port number
const PORT = process.env.PORT || 4040;

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse incoming JSON data
app.use(express.json());

// Use user routes for all /api/users endpoints
app.use("/api/users", userRoute);

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
