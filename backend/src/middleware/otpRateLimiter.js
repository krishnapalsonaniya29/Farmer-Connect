import rateLimit from "express-rate-limit";

export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // max 5 OTP requests
  message: {
    message: "Too many OTP requests. Please try again later.",
  },
});
