import { useState, useRef } from "react";
import { motion } from "framer-motion";

function OtpVerify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }

    // later → verify OTP via backend
    alert("OTP Verified (UI only)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Verify OTP 🔐
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Enter the 6-digit code sent to your phone
        </p>

        {/* OTP Inputs */}
        <motion.div
          animate={error ? { x: [-10, 10, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="mt-8 flex justify-center gap-3"
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="h-14 w-12 text-center text-xl font-semibold
                         border rounded-lg focus:outline-none
                         focus:ring-2 focus:ring-green-600"
            />
          ))}
        </motion.div>

        {error && (
          <p className="mt-4 text-center text-red-500 text-sm">
            Please enter complete OTP
          </p>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="mt-8 w-full bg-green-700 text-white py-3 rounded-lg
                     hover:bg-green-800 transition transform hover:-translate-y-0.5"
        >
          Verify & Continue
        </button>

        {/* Resend */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Didn’t receive OTP?{" "}
          <span className="text-green-700 font-medium cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default OtpVerify;
