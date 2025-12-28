import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

import RentCard from "../components/RentCard";
import ProductCard from "../components/ProductCard";

import {
  getMyEquipmentAPI,
  deleteEquipmentAPI,
  toggleEquipmentAPI,
} from "../services/equipmentService";

import { getMyProductsAPI, deleteProductAPI } from "../services/productService";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const [myEquipment, setMyEquipment] = useState([]);
  const [myProducts, setMyProducts] = useState([]);

  const [loadingEquipment, setLoadingEquipment] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  /* =========================
     Guard
     ========================= */
  if (!user) return null;

  /* =========================
     Load My Equipment
     ========================= */
  useEffect(() => {
    const loadEquipment = async () => {
      try {
        const data = await getMyEquipmentAPI();
        setMyEquipment(data);
      } catch (err) {
        console.error("Failed to load my equipment", err);
      } finally {
        setLoadingEquipment(false);
      }
    };

    loadEquipment();
  }, [user]);

  /* =========================
     Load My Products
     ========================= */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getMyProductsAPI();
        setMyProducts(data);
      } catch (err) {
        console.error("Failed to load my products", err);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, [user]);

  /* =========================
     Equipment Actions
     ========================= */
  const deleteEquipment = async (id) => {
    if (!window.confirm("Delete this equipment?")) return;

    try {
      await deleteEquipmentAPI(id);
      setMyEquipment((prev) => prev.filter((eq) => eq._id !== id));
    } catch {
      alert("Failed to delete equipment");
    }
  };

  const toggleEquipment = async (id) => {
    try {
      const updated = await toggleEquipmentAPI(id);
      setMyEquipment((prev) =>
        prev.map((eq) => (eq._id === id ? updated : eq))
      );
    } catch {
      alert("Failed to update availability");
    }
  };

  /* =========================
     Product Actions
     ========================= */
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProductAPI(id);
      setMyProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Failed to delete product");
    }
  };

  /* =========================
     Helpers
     ========================= */
  const getProfileImage = () => {
    if (!user.image) return null;
    if (typeof user.image === "string") return user.image;
    if (user.image instanceof File) return URL.createObjectURL(user.image);
    return null;
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900">My Profile 👤</h1>
        <p className="mt-2 text-gray-600">Manage your account details</p>

        {/* Profile Card */}
        <div className="mt-10 bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="h-28 w-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {getProfileImage() ? (
              <img
                src={getProfileImage()}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              {user.name}
            </h2>
            <p className="text-gray-600">📞 {user.phone}</p>
            <p className="mt-1 text-gray-600">📍 {user.location}</p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button
              onClick={() => navigate("/profile/edit")}
              className="border border-green-700 text-green-700 px-6 py-2 rounded-md hover:bg-green-50 transition"
            >
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="border border-red-300 text-red-600 px-6 py-2 rounded-md hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* My Equipment */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900">
            My Equipment on Rent 🚜
          </h2>

          {loadingEquipment ? (
            <p className="mt-4 text-gray-500">Loading equipment...</p>
          ) : myEquipment.length === 0 ? (
            <p className="mt-4 text-gray-500">
              You haven’t listed any equipment yet.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {myEquipment.map((eq) => (
                <RentCard
                  key={eq._id}
                  equipment={eq}
                  ownerView
                  onToggle={() => toggleEquipment(eq._id)}
                  onDelete={() => deleteEquipment(eq._id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* My Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900">
            My Products for Sale 🌾
          </h2>

          {loadingProducts ? (
            <p className="mt-4 text-gray-500">Loading products...</p>
          ) : myProducts.length === 0 ? (
            <p className="mt-4 text-gray-500">
              You haven’t listed any products for sale.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {myProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  mode="sell"
                  ownerView
                  onDelete={() => deleteProduct(product._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
