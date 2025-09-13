import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('auth_token'));

  // Configure axios defaults
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Get Firebase ID token
          const firebaseToken = await firebaseUser.getIdToken();
          
          // Exchange with backend
          const response = await axios.post(`${API_BASE_URL}/auth/firebase`, {
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName
          });

          const { user: backendUser, token: backendToken } = response.data;
          
          setUser(backendUser);
          setToken(backendToken);
          localStorage.setItem('auth_token', backendToken);
        } else {
          setUser(null);
          setToken(null);
          localStorage.removeItem('auth_token');
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const loginWithBackend = async (identifier, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        identifier,
        password
      });

      const { user: backendUser, token: backendToken } = response.data;
      
      setUser(backendUser);
      setToken(backendToken);
      localStorage.setItem('auth_token', backendToken);
      
      return backendUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const signupWithEmail = async (email, password, username, displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signupWithBackend = async (email, password, username, displayName) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        email,
        password,
        username,
        displayName
      });

      const { user: backendUser, token: backendToken } = response.data;
      
      setUser(backendUser);
      setToken(backendToken);
      localStorage.setItem('auth_token', backendToken);
      
      return backendUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/profile`, profileData);
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  };

  const value = {
    user,
    token,
    loading,
    loginWithEmail,
    loginWithBackend,
    signupWithEmail,
    signupWithBackend,
    loginWithGoogle,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};