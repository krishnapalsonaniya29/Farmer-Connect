function SearchBar() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex gap-3">
      <input
        type="text"
        placeholder="Search seeds, fertilizers, grains..."
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
      />
      <button className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
