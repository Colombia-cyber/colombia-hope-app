import { Link } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { to: "/", label: "🏠 Inicio" },
  { to: "/chat", label: "💬 Chat" },
  { to: "/legislation", label: "⚖️ Legislativo" },
  { to: "/congress", label: "🏛️ Congreso" },
  { to: "/news", label: "📰 Noticias" },
  { to: "/analytics", label: "📊 Analytics" },
  { to: "/debate", label: "🗣️ Debates" },
  { to: "/survey", label: "📋 Encuestas" }
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo with Colombian Flag */}
          <Link to="/" className="font-bold text-2xl text-white hover:text-yellow-200 transition flex items-center space-x-2">
            <span className="text-2xl">🇨🇴</span>
            <span>Colombia Hope</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-white hover:text-yellow-200 transition font-medium relative group px-3 py-2 rounded-lg hover:bg-white/10"
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition text-white"
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
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-white hover:text-yellow-200 transition font-medium py-2 px-4 rounded-lg hover:bg-white/10"
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