// import "./config/env.js";
// import express from "express";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";

// import authRoutes from "./routes/authRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import equipmentRoutes from "./routes/equipmentRoutes.js";
// import feedbackRoutes from "./routes/feedbackRoutes.js";
// import otpRoutes from "./routes/otpRoutes.js";

// connectDB();

// const app = express();

// // 🌐 Middlewares
// //app.use(cors());
// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173", // local dev
//       "https://your-frontend.vercel.app", // production
//     ],
//     credentials: true,
//   })
// );

// // 🔐 Auth Routes
// app.use("/api/auth", authRoutes);
// // 👤 User Routes
// app.use("/api/users", userRoutes);
// //product routes
// app.use("/api/products", productRoutes);
// //eqipment routes
// app.use("/api/equipment", equipmentRoutes);
// //feedback routes
// app.use(express.json());
// app.use("/api/feedback", feedbackRoutes);
// //otp routes
// app.use("/api/otp", otpRoutes);

// app.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({ message: err.message });
//   }

//   if (err.message === "Only image files are allowed") {
//     return res.status(400).json({ message: err.message });
//   }

//   next(err);
// });

// // 🧪 Health Check
// app.get("/", (req, res) => {
//   res.send("Farmer Connect Backend running 🚜");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import "./config/env.js";
import express from "express";
import cors from "cors";
import multer from "multer"; // ✅ FIX: import multer
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";

connectDB();

const app = express();

// 🌐 MIDDLEWARES (ORDER MATTERS)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://farmer-connect-liart.vercel.app", // ✅ REAL frontend
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔐 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/otp", otpRoutes);

// ⚠️ ERROR HANDLER (multer-safe)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  if (err.message === "Only image files are allowed") {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

// 🧪 HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Farmer Connect Backend running 🚜");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
