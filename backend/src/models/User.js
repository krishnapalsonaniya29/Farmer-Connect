import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      enum: ["farmer", "buyer", "owner"],
      default: "farmer",
    },
    phone: {
      type: String,
    },
    location: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String, // 👈 REQUIRED
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
