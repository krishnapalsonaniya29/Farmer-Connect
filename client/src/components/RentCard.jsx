import { useState } from "react";
import ContactOwnerModal from "./ContactOwnerModal";

function RentCard({ equipment, ownerView = false, onDelete, onToggle }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  // 🛡 Defensive destructuring
  const { name, image, category, pricePerDay, location, isAvailable } =
    equipment || {};

  if (!equipment) return null;

  return (
    <>
      <div className="bg-white rounded-xl border hover:shadow-xl transition overflow-hidden">
        {/* Image */}
        <div className="h-40 bg-gray-100 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-gray-400">Equipment Image</span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-gray-900">{name}</h3>

          {category && (
            <p className="mt-1 text-sm text-gray-500">Category: {category}</p>
          )}

          {pricePerDay != null && (
            <p className="mt-2 text-green-700 font-bold">
              ₹{pricePerDay} / day
            </p>
          )}

          {location && (
            <p className="mt-1 text-sm text-gray-500">📍 {location}</p>
          )}

          {/* OWNER STATUS */}
          {ownerView && (
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {isAvailable ? "Available" : "Unavailable"}
            </span>
          )}

          {/* PUBLIC ACTION */}
          {!ownerView && (
            <button
              onClick={() => setIsContactOpen(true)}
              className="mt-4 w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
            >
              Contact Owner
            </button>
          )}

          {/* OWNER ACTIONS */}
          {ownerView && (
            <div className="mt-4 space-y-2">
              {onToggle && (
                <button
                  onClick={onToggle}
                  className="w-full border border-blue-300 text-blue-600 py-2 rounded-md hover:bg-blue-50 transition"
                >
                  {isAvailable ? "Mark as Unavailable" : "Mark as Available"}
                </button>
              )}

              {onDelete && (
                <button
                  onClick={onDelete}
                  className="w-full border border-red-300 text-red-600 py-2 rounded-md hover:bg-red-50 transition"
                >
                  Delete Equipment
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Contact Modal */}
      <ContactOwnerModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        equipment={equipment}
      />
    </>
  );
}

export default RentCard;
