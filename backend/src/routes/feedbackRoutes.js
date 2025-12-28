import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Farmer Connect Feedback" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // where YOU receive
      subject: "New Feedback Received 🌾",
      html: `
        <h3>New Feedback From Farmer-Connect</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    res.status(200).json({ message: "Feedback sent successfully" });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).json({ message: "Failed to send feedback" });
  }
});

export default router;
