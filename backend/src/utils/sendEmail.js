import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
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
  });
};
