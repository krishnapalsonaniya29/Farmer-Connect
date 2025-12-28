import User from "../models/User.js";

/* =========================
   GET LOGGED-IN USER
========================= */
export const getMe = async (req, res) => {
  try {
    // req.user comes from authMiddleware
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* =========================
   UPDATE USER PROFILE
// ========================= */

export const updateProfile = async (req, res) => {
  try {
    const { name, location, phone } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name !== undefined) user.name = name;
    if (location !== undefined) user.location = location;
    if (phone !== undefined) user.phone = phone;

    // ✅ VERY IMPORTANT GUARD
    if (req.file && req.file.path) {
      user.image = req.file.path;
    }

    const updatedUser = await user.save();

    return res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        location: updatedUser.location,
        phone: updatedUser.phone,
        image: updatedUser.image,
      },
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
