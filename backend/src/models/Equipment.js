import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    pricePerDay: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
    },

    image: {
      type: String, // Cloudinary URL
    },

    location: {
      type: String,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Equipment", equipmentSchema);
