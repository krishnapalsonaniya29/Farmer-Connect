import express from "express";
import { sendOTPEmail } from "../utils/sendEmail.js";
import { saveOTP, verifyOTP } from "../utils/otpStore.js";
import { otpLimiter } from "../middleware/otpRateLimiter.js";
import User from "../models/User.js";

const router = express.Router();

/* ================= SEND OTP ================= */
router.post("/send-otp", otpLimiter, async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    saveOTP(email, otp);
    await sendOTPEmail(email, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("OTP send error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

/* ================= VERIFY OTP ================= */ router.post(
  "/verify-otp",
  async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const valid = verifyOTP(email, otp);
    if (!valid) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // ✅ CREATE OR UPDATE USER SAFELY
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        emailVerified: true,
      });
    } else {
      user.emailVerified = true;
      await user.save();
    }

    res.json({ message: "Email verified successfully" });
  }
);

export default router;
