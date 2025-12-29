import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const categories = [
  "All",
  "Seeds",
  "Fertilizers",
  "Pesticides",
  "Organic",
  "Grains",
];

function Marketplace() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchCategory = category === "All" || p.category === category;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-[#F9FAF7]"
    >
      {/* Header */}
      <div className="bg-green-700 text-white py-10 text-center">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="mt-2 opacity-90">Buy directly from farmers & suppliers</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6 space-y-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search product or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-600"
        />

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full border whitespace-nowrap transition
                ${
                  category === cat
                    ? "bg-green-700 text-white"
                    : "border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 py-20">
            No products found 🌱
          </p>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-10"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id || product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <ProductCard product={product} mode="buy" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Marketplace;
