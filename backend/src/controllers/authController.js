// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// /* =========================
//    Helper: Generate JWT
// ========================= */
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// /* =========================
//    SIGNUP
// ========================= */
// export const signup = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // ✅ Validate required fields
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         message: "Name, email and password are required",
//       });
//     }

//     // 🔍 Find user created during OTP verification
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({
//         message: "Please verify your email first",
//       });
//     }

//     // 🔐 Email must be verified
//     if (!user.emailVerified) {
//       return res.status(403).json({
//         message: "Email not verified",
//       });
//     }

//     // ❌ Prevent duplicate signup
//     if (user.password) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     // ✅ Complete user profile
//     user.name = name;
//     user.password = await bcrypt.hash(password, 10);
//     user.role = role || "farmer";

//     await user.save();

//     // ✅ Generate token
//     const token = generateToken(user._id);

//     res.json({
//       token,
//       user,
//     });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Signup failed" });
//   }
// };

// /* =========================
//    LOGIN
// ========================= */
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1️⃣ Validate input
//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password required",
//       });
//     }

//     // 2️⃣ Find user
//     const user = await User.findOne({ email });
//     if (!user || !user.password) {
//       return res.status(400).json({
//         message: "Invalid credentials",
//       });
//     }

//     // 3️⃣ Ensure email is verified
//     if (!user.emailVerified) {
//       return res.status(403).json({
//         message: "Please verify your email before login",
//       });
//     }

//     // 4️⃣ Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Invalid credentials",
//       });
//     }

//     // 5️⃣ Respond with token + user
//     res.json({
//       message: "Login successful",
//       token: generateToken(user._id),
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         location: user.location || null,
//         image: user.image || null,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =========================
   Helper: Generate JWT
========================= */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* =========================
   SIGNUP (OTP DISABLED)
========================= */
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // ❌ Prevent duplicate signup
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // ✅ Create user directly (no OTP)
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: role || "farmer",
      emailVerified: true, // 🔥 OTP disabled
    });

    // ✅ Generate token
    const token = generateToken(user._id);

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
};

/* =========================
   LOGIN (OTP DISABLED)
========================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 4️⃣ Respond with token + user
    res.json({
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location || null,
        image: user.image || null,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
