// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { signupUser, loginUser } from "../api/auth";
// import { useUser } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";

// const API_URL = import.meta.env.VITE_API_URL;

// function Auth() {
//   const [mode, setMode] = useState("login");
//   const [successMessage, setSuccessMessage] = useState("");

//   // 🔐 OTP STATES (NEW)
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [otpLoading, setOtpLoading] = useState(false);
//   const [cooldown, setCooldown] = useState(0);

//   // signup form
//   const [signupForm, setSignupForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "farmer",
//   });

//   // login form
//   const [loginForm, setLoginForm] = useState({
//     email: "",
//     password: "",
//   });

//   const { login } = useUser();
//   const navigate = useNavigate();

//   /* ---------------- SIGNUP ---------------- */

//   const handleSignupChange = (e) => {
//     setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
//   };

//   // 📩 SEND OTP
//   const sendOTP = async () => {
//     if (cooldown > 0) return;

//     if (!signupForm.email) {
//       alert("Please enter email first");
//       return;
//     }

//     setCooldown(30);

//     const timer = setInterval(() => {
//       setCooldown((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     try {
//       setOtpLoading(true);

//       const res = await fetch(`${API_URL}/api/otp/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: signupForm.email }),
//       });

//       if (!res.ok) throw new Error("OTP send failed");

//       setOtpSent(true);
//       alert("OTP sent to your email 📩");
//     } catch (err) {
//       alert("Failed to send OTP");
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   // ✅ VERIFY OTP
//   const verifyOTP = async () => {
//     try {
//       const res = await fetch(`${API_URL}/api/otp/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: signupForm.email,
//           otp,
//         }),
//       });

//       if (!res.ok) throw new Error("Invalid OTP");

//       setEmailVerified(true);
//       alert("Email verified successfully ✅");
//     } catch (err) {
//       alert("Invalid or expired OTP ❌");
//     }
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();

//     if (!emailVerified) {
//       alert("Please verify your email first");
//       return;
//     }

//     try {
//       const res = await signupUser(signupForm);

//       if (res.token && res.user) {
//         localStorage.setItem("token", res.token);
//         login(res.user);

//         setSuccessMessage("Account created successfully 🌱");

//         setTimeout(() => {
//           setSuccessMessage("");
//           navigate("/");
//         }, 1000);
//       }
//     } catch (err) {
//       alert("Signup failed");
//     }
//   };

//   /* ---------------- LOGIN ---------------- */

//   const handleLoginChange = (e) => {
//     setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await loginUser(loginForm);

//       if (!res.token || !res.user) {
//         alert(res.message || "Invalid credentials");
//         return;
//       }

//       localStorage.setItem("token", res.token);
//       login(res.user);

//       navigate("/");
//     } catch (err) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
//       <div className="relative w-full max-w-md">
//         {/* ✅ SUCCESS MESSAGE */}
//         <AnimatePresence>
//           {successMessage && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="absolute inset-0 z-50 flex items-center justify-center"
//             >
//               <div className="bg-white px-6 py-4 rounded-xl shadow-xl text-green-700 font-semibold">
//                 {successMessage}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* AUTH CARD */}
//         <AnimatePresence mode="wait">
//           {mode === "login" ? (
//             /* ---------------- LOGIN ---------------- */
//             <motion.div
//               key="login"
//               initial={{ x: 100, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: -100, opacity: 0 }}
//               transition={{ duration: 0.4 }}
//               className="bg-white rounded-2xl shadow-2xl p-8"
//             >
//               <h2 className="text-3xl font-bold text-center">
//                 Welcome Back 🌾
//               </h2>

//               <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={loginForm.email}
//                   onChange={handleLoginChange}
//                   required
//                   className="w-full px-4 py-3 border rounded-lg"
//                 />

//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   value={loginForm.password}
//                   onChange={handleLoginChange}
//                   required
//                   className="w-full px-4 py-3 border rounded-lg"
//                 />

//                 <button
//                   type="submit"
//                   className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
//                 >
//                   Login
//                 </button>
//               </form>

//               <p className="mt-6 text-center text-sm">
//                 New here?{" "}
//                 <span
//                   onClick={() => setMode("signup")}
//                   className="text-green-700 cursor-pointer hover:underline"
//                 >
//                   Create account
//                 </span>
//               </p>
//             </motion.div>
//           ) : (
//             /* ---------------- SIGNUP + OTP ---------------- */
//             <motion.div
//               key="signup"
//               initial={{ x: -100, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: 100, opacity: 0 }}
//               transition={{ duration: 0.4 }}
//               className="bg-white rounded-2xl shadow-2xl p-8"
//             >
//               <h2 className="text-3xl font-bold text-center">
//                 Create Account 🌱
//               </h2>

//               <form onSubmit={handleSignupSubmit} className="mt-6 space-y-4">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Full Name"
//                   value={signupForm.name}
//                   onChange={handleSignupChange}
//                   required
//                   className="w-full px-4 py-3 border rounded-lg"
//                 />

//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={signupForm.email}
//                   onChange={handleSignupChange}
//                   required
//                   className="w-full px-4 py-3 border rounded-lg"
//                 />

//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   value={signupForm.password}
//                   onChange={handleSignupChange}
//                   required
//                   className="w-full px-4 py-3 border rounded-lg"
//                 />

//                 {/* OTP ACTIONS */}
//                 {!otpSent && (
//                   <button
//                     type="button"
//                     onClick={sendOTP}
//                     disabled={otpLoading || cooldown > 0}
//                     className={`w-full py-3 rounded-lg transition ${
//                       cooldown > 0
//                         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                         : "bg-green-600 text-white hover:bg-green-700"
//                     }`}
//                   >
//                     {otpLoading
//                       ? "Sending OTP..."
//                       : cooldown > 0
//                       ? `Resend OTP in ${cooldown}s`
//                       : "Send OTP"}
//                   </button>
//                 )}

//                 {otpSent && !emailVerified && (
//                   <>
//                     <input
//                       type="text"
//                       placeholder="Enter 6-digit OTP"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       className="w-full px-4 py-3 border rounded-lg"
//                     />

//                     <button
//                       type="button"
//                       onClick={verifyOTP}
//                       className="w-full bg-green-700 text-white py-3 rounded-lg"
//                     >
//                       Verify OTP
//                     </button>
//                   </>
//                 )}

//                 {/* FINAL SIGNUP */}
//                 <button
//                   type="submit"
//                   disabled={!emailVerified}
//                   className={`w-full py-3 rounded-lg transition ${
//                     emailVerified
//                       ? "bg-green-700 text-white hover:bg-green-800"
//                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }`}
//                 >
//                   Sign Up
//                 </button>
//               </form>

//               <p className="mt-6 text-center text-sm">
//                 Already have an account?{" "}
//                 <span
//                   onClick={() => setMode("login")}
//                   className="text-green-700 cursor-pointer hover:underline"
//                 >
//                   Login
//                 </span>
//               </p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// export default Auth;

//
//
//
//
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signupUser, loginUser } from "../api/auth";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [mode, setMode] = useState("login");
  const [successMessage, setSuccessMessage] = useState("");

  // signup form
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer",
  });

  // login form
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useUser();
  const navigate = useNavigate();

  /* ---------------- HELPERS ---------------- */

  // ✅ Allow only Gmail addresses
  const isValidGmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  };

  /* ---------------- SIGNUP ---------------- */

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // 📧 Gmail validation
    if (!isValidGmail(signupForm.email)) {
      alert("Please use a valid Gmail address (example@gmail.com)");
      return;
    }

    try {
      const res = await signupUser(signupForm);

      if (res.token && res.user) {
        localStorage.setItem("token", res.token);
        login(res.user);

        setSuccessMessage("Account created successfully 🌱");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      alert(err.message || "Signup failed");
    }
  };

  /* ---------------- LOGIN ---------------- */

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(loginForm);

      if (!res.token || !res.user) {
        alert(res.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", res.token);
      login(res.user);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="relative w-full max-w-md">
        {/* ✅ SUCCESS MESSAGE */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-50 flex items-center justify-center"
            >
              <div className="bg-white px-6 py-4 rounded-xl shadow-xl text-green-700 font-semibold">
                {successMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AUTH CARD */}
        <AnimatePresence mode="wait">
          {mode === "login" ? (
            /* ---------------- LOGIN ---------------- */
            <motion.div
              key="login"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <h2 className="text-3xl font-bold text-center">
                Welcome Back 🌾
              </h2>

              <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <button
                  type="submit"
                  className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
                >
                  Login
                </button>
              </form>

              <p className="mt-6 text-center text-sm">
                New here?{" "}
                <span
                  onClick={() => setMode("signup")}
                  className="text-green-700 cursor-pointer hover:underline"
                >
                  Create account
                </span>
              </p>
            </motion.div>
          ) : (
            /* ---------------- SIGNUP ---------------- */
            <motion.div
              key="signup"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <h2 className="text-3xl font-bold text-center">
                Create Account 🌱
              </h2>

              {/* 📧 NOTE */}
              <p className="mt-2 text-sm text-gray-600 text-center">
                Note: Please use a{" "}
                <span className="font-semibold">valid Gmail address</span> only
              </p>

              <form onSubmit={handleSignupSubmit} className="mt-6 space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={signupForm.name}
                  onChange={handleSignupChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={signupForm.email}
                  onChange={handleSignupChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signupForm.password}
                  onChange={handleSignupChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg"
                />

                <button
                  type="submit"
                  className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
                >
                  Sign Up
                </button>
              </form>

              <p className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => setMode("login")}
                  className="text-green-700 cursor-pointer hover:underline"
                >
                  Login
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Auth;
