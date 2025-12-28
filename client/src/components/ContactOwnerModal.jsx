function ContactOwnerModal({ isOpen, onClose, equipment }) {
  if (!isOpen || !equipment) return null;

  const owner = equipment.owner;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm p-6 z-10 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Owner Contact</h2>

        <p className="mt-4 text-gray-600">Owner Name</p>
        <p className="text-lg font-medium text-gray-900">{owner?.name}</p>

        <div className="mt-5">
          <p className="text-gray-600">Phone Number</p>
          <p className="mt-1 text-2xl font-bold text-green-700">
            {owner?.phone}
          </p>
        </div>

        {owner?.location && (
          <p className="mt-2 text-sm text-gray-600">📍 {owner.location}</p>
        )}

        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-500 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ContactOwnerModal;
