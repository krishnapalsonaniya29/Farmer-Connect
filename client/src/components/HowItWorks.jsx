const steps = [
  {
    title: "Create Account",
    description:
      "Register using your mobile number as a farmer, buyer, or owner.",
    icon: "👤",
  },
  {
    title: "Explore or List",
    description: "Browse products, list produce, or add equipment for rent.",
    icon: "🔍",
  },
  {
    title: "Connect Directly",
    description: "Call or message sellers and equipment owners directly.",
    icon: "📞",
  },
  {
    title: "Trade & Grow",
    description: "Complete the deal and grow your farming business.",
    icon: "🌾",
  },
];

function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-28">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-green-700 font-semibold uppercase tracking-wide">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            A Simple & Transparent Process
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Designed like a flow — simple steps that guide you from start to
            success.
          </p>
        </div>

        {/* Flow Graph */}
        <div className="relative mt-24">
          {/* Connector Line (Desktop) */}={/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Node */}
                <div
                  className="mx-auto h-20 w-20 rounded-full bg-white border-4 border-green-600 
                                flex items-center justify-center text-3xl
                                shadow-lg hover:scale-105 transition"
                >
                  {step.icon}
                </div>

                {/* Mobile Connector */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden mx-auto h-10 w-1 bg-green-400"></div>
                )}

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-gray-600 px-4">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
