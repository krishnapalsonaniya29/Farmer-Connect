import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const categories = ["All", "Seeds", "Fertilizers", "Pesticides", "Organic"];

function Buy() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 🔁 Load products from Sell module storage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("fc_sell_products")) || [];
    setProducts(stored);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900">
            Buy Seeds & Fertilizers 🌱
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore quality agricultural products from trusted sellers.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full md:w-1/2 px-4 py-3 border rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full border transition ${
                  selectedCategory === cat
                    ? "bg-green-600 text-white border-green-600"
                    : "text-gray-700 hover:bg-green-600 hover:text-white hover:border-green-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} mode="buy" />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Buy;
