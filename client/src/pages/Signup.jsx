import { useState } from "react";
import { signupUser } from "../api/auth";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signupUser(form);

      if (res.token && res.user) {
        // 🔐 auto login
        localStorage.setItem("token", res.token);
        login(res.user);

        setSuccessMessage("Account created successfully 🌱");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="relative w-full max-w-md">
        {/* Success message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center"
            >
              <div className="bg-white px-6 py-4 rounded-xl shadow-xl text-green-700 font-semibold">
                {successMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border p-2 w-full mb-4"
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
            <option value="owner">Equipment Owner</option>
          </select>

          <button
            type="submit"
            className="bg-green-700 text-white py-2 w-full rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
