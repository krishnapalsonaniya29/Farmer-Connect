import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

const categories = [
  "Tractor",
  "Harvester",
  "Thresher",
  "Rotavator",
  "Seeder",
  "Other",
];

function AddEquipmentModal({ isOpen, onClose, onAdd }) {
  const { user } = useUser();

  const initialForm = {
    name: "",
    category: "",
    pricePerDay: "",
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

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.category || !form.pricePerDay) {
      alert("Please fill all required fields");
      return;
    }

    onAdd(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 z-10">
        <h2 className="text-2xl font-semibold text-gray-900">
          Put Equipment on Rent 🚜
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Add details so farmers can contact you easily
        </p>

        <div className="mt-6 space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Equipment name (e.g. Tractor 575)"
            className="w-full px-4 py-2 border rounded-md"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md bg-white"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            name="pricePerDay"
            type="number"
            value={form.pricePerDay}
            onChange={handleChange}
            placeholder="Rent per day (₹)"
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full px-4 py-2 border rounded-md"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            rows={3}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="text-sm"
          />
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
          >
            Add Equipment
          </button>
          <button
            onClick={onClose}
            className="flex-1 border py-2 rounded-md hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEquipmentModal;
