import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials not configured");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // MUST be App Password
    },
  });

  // ✅ Verify transporter (very important)
  await transporter.verify();

  const mailOptions = {
    from: `"Farmer Connect" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Farmer Connect OTP",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Farmer Connect Email Verification</h2>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
