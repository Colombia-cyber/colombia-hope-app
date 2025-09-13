import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/social", label: "Social" },
  { to: "/friends", label: "Amigos" },
  { to: "/chat", label: "Chat" },
  { to: "/debate", label: "Debates" },
  { to: "/survey", label: "Encuestas" },
  { to: "/news", label: "Noticias" }
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { user, logout, isAuthenticated, loading } = useAuth();

  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuth = () => {
    setShowAuthModal(false);
  };

  if (loading) {
    return (
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="font-bold text-2xl text-blue-600">
              Colombia Hope
            </Link>
            <div className="animate-pulse">
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
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

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.displayName || user.username}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {(user?.displayName || user?.username || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {user?.displayName || user?.username}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-600 hover:text-red-600 transition"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openAuth('login')}
                    className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 transition"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => openAuth('signup')}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Registrarse
                  </button>
                </div>
              )}
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
                
                {/* Mobile Auth */}
                <div className="pt-3 border-t border-gray-200">
                  {isAuthenticated ? (
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-2 mb-2">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.displayName || user.username}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {(user?.displayName || user?.username || 'U').charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-sm font-medium text-gray-700">
                          {user?.displayName || user?.username}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  ) : (
                    <div className="px-4 space-y-2">
                      <button
                        onClick={() => {
                          openAuth('login');
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left py-2 text-gray-700 hover:text-blue-600"
                      >
                        Iniciar Sesión
                      </button>
                      <button
                        onClick={() => {
                          openAuth('signup');
                          setIsMenuOpen(false);
                        }}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                      >
                        Registrarse
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closeAuth}
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4 z-10">
                <button
                  onClick={closeAuth}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                {authMode === 'login' ? (
                  <LoginForm 
                    onSwitchToSignup={() => setAuthMode('signup')} 
                    onClose={closeAuth}
                  />
                ) : (
                  <SignupForm 
                    onSwitchToLogin={() => setAuthMode('login')} 
                    onClose={closeAuth}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;