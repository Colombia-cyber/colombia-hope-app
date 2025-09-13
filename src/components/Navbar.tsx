import { Link } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/chat", label: "Chat" },
  { to: "/debate", label: "Debates" },
  { to: "/survey", label: "Encuestas" },
  { to: "/news", label: "Noticias" }
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl text-blue-600 hover:text-blue-700 transition">
            Colombia Hope
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-gray-700 hover:text-blue-600 transition font-medium relative group"
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-gray-700 hover:text-blue-600 transition font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;