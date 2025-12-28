function ContactSellerModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  const farmer = product.farmer;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm p-6 z-10">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 text-center">
          Contact Seller
        </h2>

        {/* Seller Info */}
        <div className="mt-5 text-center">
          <p className="text-sm text-gray-500">Seller</p>
          <p className="text-lg font-semibold text-gray-900">
            {farmer?.name || "Farmer"}
          </p>

          {(product.location || farmer?.location) && (
            <p className="mt-1 text-sm text-gray-600">
              📍 {product.location || farmer.location}
            </p>
          )}
        </div>

        {/* Phone */}
        {farmer?.phone && (
          <div className="mt-5 text-center">
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="mt-1 text-2xl font-bold text-green-700">
              {farmer.phone}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 space-y-3">
          {/* Call */}
          {farmer?.phone && (
            <a
              href={`tel:${farmer.phone}`}
              className="block w-full text-center bg-green-700 text-white py-2.5 rounded-md hover:bg-green-800 transition"
            >
              📞 Call Seller
            </a>
          )}

          {/* WhatsApp */}
          {farmer?.phone && (
            <a
              href={`https://wa.me/91${farmer.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center border border-green-700 text-green-700 py-2.5 rounded-md hover:bg-green-50 transition"
            >
              💬 WhatsApp
            </a>
          )}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="mt-6 w-full text-sm text-gray-500 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ContactSellerModal;
