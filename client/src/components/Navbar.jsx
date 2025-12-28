import { useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const linkClass = ({ isActive }) =>
    `text-gray-700 hover:text-green-700 transition ${
      isActive ? "text-green-700 font-semibold" : ""
    }`;

  // ✅ SAFE image resolver
  const getProfileImage = () => {
    if (!user?.image) return null;

    if (typeof user.image === "string") {
      return user.image;
    }

    if (user.image instanceof File) {
      return URL.createObjectURL(user.image);
    }

    return null;
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Farmer Connect"
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl font-semibold text-gray-800">
              Farmer Connect
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/buy" className={linkClass}>
              Buy
            </NavLink>
            <NavLink to="/sell" className={linkClass}>
              Sell
            </NavLink>
            <NavLink to="/rent" className={linkClass}>
              Rent
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>

            {!user ? (
              <NavLink
                to="/auth"
                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition"
              >
                Login
              </NavLink>
            ) : (
              <NavLink
                to="/profile"
                className="flex items-center gap-2 border px-3 py-1.5 rounded-full hover:bg-gray-50 transition"
              >
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                  {getProfileImage() ? (
                    <img
                      src={getProfileImage()}
                      alt="profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-600">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-700">
                  {user.name?.split(" ")[0]}
                </span>
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col gap-4 px-4 py-4">
            <NavLink to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/buy" onClick={() => setOpen(false)}>
              Buy
            </NavLink>
            <NavLink to="/sell" onClick={() => setOpen(false)}>
              Sell
            </NavLink>
            <NavLink to="/rent" onClick={() => setOpen(false)}>
              Rent
            </NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)}>
              Contact
            </NavLink>

            {!user ? (
              <NavLink
                to="/auth"
                className="bg-green-700 text-white px-4 py-2 rounded-md"
                onClick={() => setOpen(false)}
              >
                Login
              </NavLink>
            ) : (
              <NavLink to="/profile" onClick={() => setOpen(false)}>
                Profile
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
