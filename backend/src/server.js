import "./config/env.js";
import express from "express";
import cors from "cors";
import multer from "multer";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";

connectDB();

const app = express();

/* =========================
   ✅ CORS (FIXED PROPERLY)
========================= */
const allowedOrigins = [
  "http://localhost:5173",
  "https://farmer-connect-liart.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ VERY IMPORTANT: handle preflight explicitly
app.options("*", cors());

/* =========================
   BODY PARSERS
========================= */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/otp", otpRoutes);

/* =========================
   ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("Farmer Connect Backend running 🚜");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
