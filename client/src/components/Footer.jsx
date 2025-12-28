import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
function Footer() {
  return (
    <footer className="bg-green-900 text-green-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        {/* 🌱 Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Farmer Connect" className="h-10 w-auto" />
            <h2 className="text-xl font-semibold">Farmer Connect</h2>
          </div>
          <p className="mt-4 text-sm text-green-200 leading-relaxed">
            A platform connecting farmers directly with seeds, fertilizers, and
            agricultural equipment providers.
          </p>
        </div>

        {/* 🔗 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/buy" className="hover:text-white transition">
                Marketplace
              </Link>
            </li>
            <li>
              <Link to="/sell" className="hover:text-white transition">
                Sell Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* 📞 Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-green-200">
            <li>Email: webstieyojnaforu@gmail.com</li>
            <li>Phone: +91 9826878292</li>
            <li>Phone: +91 9179928338</li>
            <li>India 🇮🇳</li>
          </ul>
        </div>
      </div>

      {/* 🔒 Bottom Bar */}
      <div className="border-t border-green-800 py-4 text-center text-sm text-green-300">
        © {new Date().getFullYear()} Farmer Connect. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
