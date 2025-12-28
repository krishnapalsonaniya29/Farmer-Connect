const features = [
  {
    icon: "🌱",
    title: "Buy Seeds & Fertilizers",
    description:
      "Access verified seeds and fertilizers from trusted sellers with transparent pricing.",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    icon: "💰",
    title: "Sell Without Middlemen",
    description:
      "List your products directly and connect with buyers to get the best value.",
    gradient: "from-yellow-500 to-orange-400",
  },
  {
    icon: "🚜",
    title: "Rent Farm Equipment",
    description:
      "Find tractors and agricultural machinery near you with flexible rental options.",
    gradient: "from-blue-500 to-cyan-400",
  },
];

function Features() {
  return (
    <section className="relative bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-24">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-green-700 font-semibold tracking-wide uppercase">
            Platform Features
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
            A Smarter Way to Farm & Trade
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Farmer Connect combines technology with agriculture to simplify
            buying, selling, and renting — all in one place.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl border bg-white/70 backdrop-blur 
                           hover:-translate-y-2 transition-all duration-300
                           hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
            >
              {/* Gradient Glow */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                              transition duration-300 blur-xl bg-gradient-to-r ${feature.gradient}`}
              ></div>

              {/* Card Content */}
              <div className="relative z-10">
                <div
                  className={`inline-flex items-center justify-center h-14 w-14 
                                rounded-xl bg-gradient-to-r ${feature.gradient} text-2xl`}
                >
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-6 text-green-700 font-medium">
                  Learn more →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
