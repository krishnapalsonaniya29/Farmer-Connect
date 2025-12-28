import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import AddProductModal from "../components/AddProductModal";
import ProductCard from "../components/ProductCard";
import {
  getMyProductsAPI,
  addProductAPI,
  deleteProductAPI,
} from "../services/productService";

function Sell() {
  const { user } = useUser();

  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔁 Load my products once user is ready
  useEffect(() => {
    if (user) {
      loadMyProducts();
    }
  }, [user]);

  const loadMyProducts = async () => {
    try {
      const data = await getMyProductsAPI();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Add product (FIXED)
  const addProduct = async (data) => {
    try {
      const formData = new FormData();

      // ✅ Append fields explicitly (IMPORTANT)
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);

      if (data.description) {
        formData.append("description", data.description);
      }

      if (data.location) {
        formData.append("location", data.location);
      }

      // 🔥 MUST match upload.single("image")
      if (data.image) {
        formData.append("image", data.image);
      }

      await addProductAPI(formData);

      setOpen(false);
      loadMyProducts();
    } catch (err) {
      alert(err.message || "Failed to add product");
    }
  };

  // 🗑 Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProductAPI(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  if (!user) return null;
  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Sell Your Products
            </h1>
            <p className="mt-2 text-gray-600">
              Add products and connect directly with buyers
            </p>
            <p className="mt-2 text-red-600">
              Note: Only seeds, fertilizers, grains, pesticides, and organics
              can be put on sale{" "}
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-green-700 text-white px-6 py-3 rounded-md"
          >
            + Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <p className="mt-12 text-gray-500">
            You haven’t added any products yet.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
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

        <AddProductModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onAdd={addProduct}
        />
      </div>
    </div>
  );
}

export default Sell;
