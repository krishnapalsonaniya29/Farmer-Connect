import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductCard({ product, mode = "buy", ownerView = false, onDelete }) {
  const [imageUrl, setImageUrl] = useState(null);

  // 🛡 Guard against invalid data
  if (!product) return null;

  const { _id, name, category, price, quantity, description, location, image } =
    product;

  /* =========================
     Resolve image source safely
     ========================= */
  useEffect(() => {
    if (!image) {
      setImageUrl(null);
      return;
    }

    // Backend URL
    if (typeof image === "string") {
      setImageUrl(image);
      return;
    }

    // Local File / Blob
    if (image instanceof File || image instanceof Blob) {
      const url = URL.createObjectURL(image);
      setImageUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  return (
    <div className="bg-white rounded-xl border hover:shadow-xl transition overflow-hidden">
      {/* Image */}
      <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>Product Image</span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-gray-900">{name}</h3>

        {category && (
          <p className="mt-1 text-sm text-gray-500">Category: {category}</p>
        )}

        {price != null && (
          <p className="mt-2 text-green-700 font-bold">₹{price}</p>
        )}

        {quantity && (
          <p className="mt-1 text-sm text-gray-500">Quantity: {quantity}</p>
        )}

        {location && (
          <p className="mt-1 text-sm text-gray-500">📍 {location}</p>
        )}

        {description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
        )}

        {/* BUY MODE */}
        {mode === "buy" && _id && (
          <Link
            to={`/product/${_id}`}
            className="block mt-4 w-full text-center bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
          >
            View Details
          </Link>
        )}

        {/* SELL MODE (OWNER) */}
        {mode === "sell" && ownerView && onDelete && (
          <button
            onClick={onDelete}
            className="mt-4 w-full border border-red-300 text-red-600 py-2 rounded-md hover:bg-red-50 transition"
          >
            Delete Product
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
