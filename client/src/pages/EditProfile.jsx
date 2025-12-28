import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import { updateProfileAPI } from "../services/userService";

function EditProfile() {
  const navigate = useNavigate();
  const { user, updateProfile } = useUser();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  // 🔐 redirect if not logged in
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // sync from user
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setLocation(user.location || "");
      setPhone(user.phone || "");
      setImage(user.image || null);
    }
  }, [user]);

  // preview image
  const getPreviewImage = () => {
    if (!image) return null;
    if (typeof image === "string") return image;
    if (image instanceof File) return URL.createObjectURL(image);
    return null;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSave = async () => {
    if (phone && !/^[6-9]\d{9}$/.test(phone)) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("location", location);
      formData.append("phone", phone);

      if (image instanceof File) {
        formData.append("image", image);
      }

      const data = await updateProfileAPI(formData);

      updateProfile(data.user);
      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-center">Edit Profile ✏️</h1>

        {/* Image */}
        <div className="mt-6 flex justify-center">
          <label className="cursor-pointer">
            <div className="h-28 w-28 rounded-full border overflow-hidden flex items-center justify-center">
              {getPreviewImage() ? (
                <img
                  src={getPreviewImage()}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Upload Photo</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Form */}
        <div className="mt-8 space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="text"
            value={user.email}
            disabled
            className="w-full px-4 py-3 border rounded-lg bg-gray-100"
          />

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            maxLength={10}
            placeholder="Phone Number"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Village, District"
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="flex-1 border py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex-1 bg-green-700 text-white py-3 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default EditProfile;
