import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {});
    console.log("Database connected successfully!");
  } catch (error) {
    console.log("Error in connecting Database: ", error);
  }
};
