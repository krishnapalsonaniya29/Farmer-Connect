import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";

const slides = [
  {
    title: "Connecting Farmers Directly",
    highlight: "Buy, Sell & Rent with Ease",
    description:
      "A platform that helps farmers buy seeds & fertilizers and directly contact equipment owners without middlemen.",
    image: hero1,
  },
  {
    title: "Fair Pricing for Everyone",
    highlight: "No Middlemen Involved",
    description:
      "Farmers and buyers get transparent pricing while equipment owners reach customers directly.",
    image: hero2,
  },
  {
    title: "Rent Agricultural Equipment",
    highlight: "Near Your Location",
    description:
      "Find tractors, harvesters, and tools from nearby owners quickly and easily.",
    image: hero3,
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* LEFT: TEXT */}
          <div className="transition-all duration-700">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {slide.title} <br />
              <span className="text-green-700">{slide.highlight}</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              {slide.description}
            </p>

            {/* 🔘 3 ACTION BUTTONS */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/buy"
                className="bg-green-700 text-white px-6 py-3 rounded-md hover:bg-green-800 transition"
              >
                Buy Products
              </Link>

              <Link
                to="/sell"
                className="border border-green-700 text-green-700 px-6 py-3 rounded-md hover:bg-green-50 transition"
              >
                Sell Products
              </Link>

              <Link
                to="/rent"
                className="bg-white border border-green-700 text-green-700 px-6 py-3 rounded-md hover:bg-green-50 transition"
              >
                Rent Equipment
              </Link>
            </div>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="flex justify-center transition-all duration-700">
            <img
              key={slide.image}
              src={slide.image}
              alt="Agriculture"
              className="w-full max-w-lg h-auto rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>

        {/* DOTS */}
        <div className="mt-10 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full transition ${
                current === index ? "bg-green-700" : "bg-green-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
