import mongoose from "mongoose";

// Function to connect MongoDB database
const connectDB = async () => {
  try {
    // Connect to MongoDB using connection string from environment file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    // If connection fails show error and stop the process
    console.error("MongoDB Connection Error ", error);
    process.exit(1);
  }
};

// Export the function to use in other files
export default connectDB;
