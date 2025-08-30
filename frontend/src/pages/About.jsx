import React from "react";
import { Link, useLocation } from "react-router-dom";

// SVG Icon for the logo
const BotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 text-blue-600"
  >
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
    <path d="M12 7c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm0 4c-.551 0-1-.449-1-1s.449-1 1-1 1 .449 1 1-.449 1-1 1z" />
    <path d="M12 14c-2.757 0-5 2.243-5 5h10c0-2.757-2.243-5-5-5z" />
  </svg>
);

const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/chat", label: "Chatbot" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 font-extrabold text-gray-800 text-2xl tracking-tight">
            <BotIcon />
            <span>MIRA</span>
          </Link>
          <div className="hidden sm:flex items-center sm:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-semibold text-lg transition-colors duration-200 relative pb-1 ${
                  pathname === link.to
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                {link.label}
                {pathname === link.to && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}