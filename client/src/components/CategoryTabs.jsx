const categories = [
  "All",
  "Seeds",
  "Fertilizers",
  "Pesticides",
  "Organic",
  "Grains",
];

function CategoryTabs() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat}
          className="px-5 py-2 rounded-full border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition whitespace-nowrap"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
