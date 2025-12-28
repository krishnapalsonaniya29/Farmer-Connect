import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI); // 👈 TEMP DEBUG

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
