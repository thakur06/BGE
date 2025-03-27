import { useState } from "react";
import logo from "../assets/icons/logo.png";
import { Link } from "react-router-dom";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Process", to: "/process" },
    { label: "Electrical", to: "/electrical" },
    { label: "Mechanical", to: "/mechanical" },
  ];

  return (
    <nav className=" text-amber-900 p-2 fixed w-full top-0 z-10 shadow-md bg-white shadow-black">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Text Container */}
        <Link to="/" className="flex items-center space-x-2 font-bold">
          <img src={logo} alt="Biogas Engineering Logo" className="h-10 w-10" />
          <div className="flex flex-col">
            <p className="text-amber-800">
              BIO<span className="text-green-600">GAS</span>
            </p>
            <p className="text-amber-800">ENGINEERING</p>
          </div>
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="black"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center font-semibold">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="hover:text-gray-300 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/signin"
            className="bg-white px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Mobile Menu (Shown when isOpen is true) */}
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"} mt-4`}
      >
        <div className="flex flex-col space-y-4 p-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="hover:text-gray-300 transition-colors font-bold"
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/signin"
            className="bg-white text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-center"
            onClick={() => setIsOpen(false)} // Close menu on click
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
