import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import RentCard from "../components/RentCard";
import {
  getAllEquipmentAPI,
  addEquipmentAPI,
} from "../services/equipmentService";
import AddEquipmentModal from "../components/AddEquipmentModal";

/* ---------------------------------------
   Constants
--------------------------------------- */
const CATEGORIES = [
  "Tractor",
  "Harvester",
  "Thresher",
  "Rotavator",
  "Seeder",
  "Other",
];

/* ---------------------------------------
   Rent Page
--------------------------------------- */
function Rent() {
  const { user } = useUser();

  // raw + filtered data
  const [allEquipment, setAllEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);

  // ui states
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // filters
  const [category, setCategory] = useState("all");
  const [locationQuery, setLocationQuery] = useState("");

  /* ---------------------------------------
     Fetch equipment from backend
  --------------------------------------- */
  const fetchEquipment = async () => {
    try {
      const data = await getAllEquipmentAPI();
      setAllEquipment(data);
    } catch (error) {
      console.error("Failed to fetch equipment", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------------------
     Apply filters (single source of truth)
  --------------------------------------- */
  const applyFilters = () => {
    let result = [...allEquipment];

    // hide my own equipment
    if (user) {
      result = result.filter((eq) => eq.owner && eq.owner._id !== user._id);
    }

    // category filter
    if (category !== "all") {
      result = result.filter(
        (eq) => eq.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // location filter (only if user typed)
    if (locationQuery.trim()) {
      result = result.filter((eq) =>
        eq.location?.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }

    setFilteredEquipment(result);
  };

  /* ---------------------------------------
     Effects
  --------------------------------------- */
  useEffect(() => {
    fetchEquipment();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [allEquipment, user, category, locationQuery]);

  /* ---------------------------------------
     Handlers
  --------------------------------------- */
  const clearFilters = () => {
    setCategory("all");
    setLocationQuery("");
  };

  const handleAddEquipment = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("pricePerDay", data.pricePerDay);
      formData.append("location", data.location);

      if (data.description) {
        formData.append("description", data.description);
      }

      if (data.image) {
        formData.append("image", data.image);
      }

      await addEquipmentAPI(formData);
      setIsModalOpen(false);
      fetchEquipment();
    } catch (error) {
      alert(error.message || "Failed to add equipment");
    }
  };

  /* ---------------------------------------
     Render
  --------------------------------------- */
  if (loading) {
    return <p className="p-10">Loading equipment...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* 🌾 HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 leading-tight">
            Rent Farming Equipment 🚜
          </h1>

          <p className="mt-4 text-lg text-gray-700">
            Find trusted farming tools shared by farmers near you.
            <br className="hidden sm:block" />
            Save money, grow together 🌱
          </p>

          <div className="mt-6 flex justify-center gap-3 text-sm text-green-700">
            <span className="bg-green-100 px-4 py-1 rounded-full">
              🌾 Community Powered
            </span>
            <span className="bg-amber-100 px-4 py-1 rounded-full">
              🚜 Real Equipment
            </span>
          </div>
        </div>

        {/* 🧰 FILTER PANEL */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-14">
          <div className="flex flex-col md:flex-row gap-6 items-end">
            {/* Category */}
            <div className="w-full md:max-w-xs">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Equipment Type
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-white focus:ring-2 focus:ring-green-600"
              >
                <option value="all">All Equipment</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="w-full md:max-w-xs">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Village / City (e.g. Dewas)"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Clear */}
            <button
              onClick={clearFilters}
              className="px-6 py-3 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Clear
            </button>

            {/* Add */}
            {user && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg transition"
              >
                + Put on Rent
              </button>
            )}
          </div>
        </div>

        {/* 🚜 EQUIPMENT GRID */}
        {filteredEquipment.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              No equipment found for this selection 🌱
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Try clearing filters or searching another area
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {filteredEquipment.map((item) => (
              <RentCard key={item._id} equipment={item} />
            ))}
          </div>
        )}

        {/* MODAL */}
        <AddEquipmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddEquipment}
        />
      </div>
    </div>
  );
}

export default Rent;
