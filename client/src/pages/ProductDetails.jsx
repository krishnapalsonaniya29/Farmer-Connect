import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import ContactSellerModal from "../components/ContactSellerModal";

function ProductDetails() {
  const { id } = useParams();
  const { user } = useUser();

  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  // 🖼️ Safe image handler
  useEffect(() => {
    if (!product?.image) return;

    if (typeof product.image === "string") {
      setImageUrl(product.image);
    } else {
      const url = URL.createObjectURL(product.image);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="h-80 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-gray-400">Product Image</span>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

          <p className="mt-2 text-gray-600">Category: {product.category}</p>

          {product.rating && (
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < product.rating ? "⭐" : "☆"}</span>
              ))}
              <span className="ml-2 text-gray-500">({product.rating}/5)</span>
            </div>
          )}

          <p className="mt-4 text-2xl font-bold text-green-700">
            ₹{product.price}
          </p>

          {product.description && (
            <p className="mt-4 text-gray-700">{product.description}</p>
          )}

          <p className="mt-4 text-gray-600">
            Seller: <strong>{product.farmer?.name || "Farmer"}</strong>
          </p>

          <p className="mt-2 text-gray-600">
            📍 Location:{" "}
            <strong>{product.location || product.farmer?.location}</strong>
          </p>

          {/* Contact Seller */}
          <button
            onClick={() => {
              if (!user) {
                alert("Please login to contact the seller");
                return;
              }
              setOpen(true);
            }}
            className="mt-6 bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition"
          >
            Contact Seller
          </button>

          <ContactSellerModal
            isOpen={open}
            onClose={() => setOpen(false)}
            product={product}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
