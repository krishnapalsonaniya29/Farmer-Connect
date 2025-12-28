import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Seeds", "Fertilizers", "Pesticides", "Organic", "Grains"];

function AddProductModal({ isOpen, onClose, onAdd }) {
  const { user } = useUser();

  const initialForm = {
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    location: "",
    image: null,
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (isOpen && user) {
      setForm({
        ...initialForm,
        location: user.location || "",
      });
    }
  }, [isOpen, user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.category ||
      !form.price ||
      !form.quantity ||
      !form.image
    ) {
      alert("Please fill all required fields");
      return;
    }

    onAdd(form);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative bg-white w-full max-w-lg max-h-[90vh] rounded-2xl shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-900">
                🌾 Add Product for Sale
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Share details so buyers can find your product easily
              </p>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4 overflow-y-auto">
              <Input label="Product Name *">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="input"
                />
              </Input>

              <Input label="Category *">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="input bg-white"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </Input>

              <Input label="Price (₹) *">
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  className="input"
                />
              </Input>

              <Input label="Quantity *">
                <input
                  name="quantity"
                  placeholder="e.g. 50 kg, 20 bags"
                  value={form.quantity}
                  onChange={handleChange}
                  className="input"
                />
              </Input>

              <Input label="Location">
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="input"
                />
              </Input>

              <Input label="Description">
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="input"
                />
              </Input>

              <Input label="Product Photo *">
                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-green-500 transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.files[0] })
                    }
                    className="hidden"
                    id="product-image"
                  />
                  <label
                    htmlFor="product-image"
                    className="cursor-pointer text-sm text-gray-600"
                  >
                    {form.image
                      ? `📸 ${form.image.name}`
                      : "Click to upload product image"}
                  </label>
                </div>
              </Input>
            </div>

            {/* Footer */}
            <div className="p-6 border-t flex gap-3">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded-md transition"
              >
                Add Product
              </button>

              <button
                onClick={onClose}
                className="flex-1 border py-2 rounded-md hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Small reusable input wrapper */
const Input = ({ label, children }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <div className="mt-1">{children}</div>
  </div>
);

export default AddProductModal;
