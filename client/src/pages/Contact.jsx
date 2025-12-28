import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
function Contact() {
  // ================= FEEDBACK STATE =================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // success UI
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");

      setTimeout(() => setSuccess(false), 1000);
    } catch (err) {
      console.error("Feedback error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div className="bg-green-700 text-white px-10 py-4 rounded-xl shadow-2xl text-lg">
                Feedback sent successfully 🌱
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        ;{/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            Farmer Connect 🌾
          </h1>
          <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
            Connecting farmers directly to markets, machines, and opportunities.
          </p>
        </motion.div>
        {/* WHO WE ARE */}
        <div className="mt-16 bg-white rounded-2xl shadow overflow-hidden">
          <div className="h-200">
            <img
              src="https://res.cloudinary.com/dltnhcifl/image/upload/v1766839274/Gemini_Generated_Image_mc8m19mc8m19mc8m_uofhsr.png"
              alt="Indian farming landscape"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>

            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Farmer Connect is built with a simple belief —
              <strong>
                {" "}
                farmers should control how they sell, rent, and grow.
              </strong>
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              We remove unnecessary middlemen and enable direct connections
              between farmers, buyers, and equipment owners using technology
              that is simple, transparent, and practical.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Our mission is not disruption — it is empowerment.
            </p>
          </div>
        </div>
        {/* CREATORS */}
        {/* CREATORS */}
        <div className="mt-16 bg-white rounded-2xl shadow p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Built by the Creators
          </h2>

          <p className="mt-3 text-center text-gray-600 max-w-3xl mx-auto">
            Farmer Connect is built by two engineers who believe technology must
            work for farmers — not the other way around.
          </p>

          {/* CREATOR 1 */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="h-200 rounded-xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/dltnhcifl/image/upload/v1766839227/unnamed_ewscd9.jpg" // 👈 replace with your image
                alt="Creator 1"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Message */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Krishnapal Sonaniya
              </h3>
              <p className="text-sm text-gray-500">Co-Founder & Engineer</p>

              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                “I grew up seeing how dependent farmers are on middlemen and
                outdated systems. Farmer Connect is my attempt to change that —
                by giving farmers direct access, control, and clarity through
                technology.”
              </p>

              <p className="mt-3 text-gray-700">
                This platform is built with simplicity, honesty, and real
                agricultural needs in mind.
              </p>
            </div>
          </div>

          {/* CREATOR 2 */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
            {/* Message */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Your Friend’s Name
              </h3>
              <p className="text-sm text-gray-500">Co-Founder & Engineer</p>

              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                “Farmer Connect is not just a project for us — it is a
                responsibility. We are building a system that farmers can trust,
                use easily, and benefit from without confusion or exploitation.”
              </p>

              <p className="mt-3 text-gray-700">
                Every feature is designed to be practical, transparent, and
                farmer-first.
              </p>
            </div>

            {/* Image */}
            <div className="h-200 rounded-xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/dltnhcifl/image/upload/v1766839228/creator2_ch4tma.webp" // 👈 replace with your image
                alt="Creator 2"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        {/* FEEDBACK */}
        {/* FEEDBACK */}
        <div className="mt-16 bg-white rounded-2xl shadow p-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Share Your Feedback
          </h2>

          <p className="mt-2 text-gray-600">
            Your suggestions help us build a better platform for farmers.
          </p>

          <form onSubmit={handleFeedbackSubmit} className="mt-6 space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 border rounded-md"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 border rounded-md"
            />

            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              required
              className="w-full px-4 py-3 border rounded-md"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-green-700 text-white px-8 py-3 rounded-md hover:bg-green-800 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
        {/* CONTACT INFO */}
        <div className="mt-16 bg-white rounded-2xl shadow p-8">
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>

          <div className="mt-6 space-y-3 text-lg text-gray-700">
            <p>📧 webstieyojnaforu@gmail.com</p>
            <p>📞 +91 98268728292</p>
            <p>📞 +91 9179928338</p>
            <p className="text-sm text-gray-500">
              Monday – Saturday | 9 AM – 6 PM
            </p>
          </div>
        </div>
        <p className="mt-12 text-center text-gray-600">
          🌾 Built with respect for farmers, trust, and technology.
        </p>
      </div>
    </div>
  );
}

export default Contact;
