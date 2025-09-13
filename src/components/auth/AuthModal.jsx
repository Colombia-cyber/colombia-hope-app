import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuth } from '../../contexts/AuthContext';

const AuthModal = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login' or 'signup'

  // Don't render if user is authenticated
  if (isAuthenticated) {
    return null;
  }

  const openModal = (view = 'login') => {
    setCurrentView(view);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const switchToLogin = () => {
    setCurrentView('login');
  };

  const switchToSignup = () => {
    setCurrentView('signup');
  };

  return (
    <>
      {/* Trigger buttons can be added to Navbar or other components */}
      <div className="hidden">
        <button onClick={() => openModal('login')}>Login</button>
        <button onClick={() => openModal('signup')}>Signup</button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={closeModal}
            ></div>

            {/* Center modal */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={closeModal}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="sr-only">Cerrar</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                {currentView === 'login' ? (
                  <LoginForm 
                    onSwitchToSignup={switchToSignup} 
                    onClose={closeModal}
                  />
                ) : (
                  <SignupForm 
                    onSwitchToLogin={switchToLogin} 
                    onClose={closeModal}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;