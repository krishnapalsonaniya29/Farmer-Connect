import ProductCard from "./ProductCard";

const dummyProducts = [
  {
    id: 1,
    name: "Wheat Seeds",
    category: "Seeds",
    price: 1200,
    quantity: "50 kg",
    location: "Dewas, MP",
    seller: "Ramesh Patel",
    image: "https://images.unsplash.com/photo-1592982537447-6c1c7e3f90cf",
  },
  {
    id: 2,
    name: "Organic Fertilizer",
    category: "Organic",
    price: 850,
    quantity: "25 kg",
    location: "Indore, MP",
    seller: "Suresh Verma",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449",
  },
];

function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-10">
      {dummyProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
