
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  email: string;
  name?: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const navigate = useNavigate();

  // Load user from localStorage only once when component mounts
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to parse user data from localStorage', error);
      localStorage.removeItem('user');
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, we'll just simulate authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) { // In a real app, validate credentials
          const newUser = { email };
          setUser(newUser);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(newUser));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    // For demo purposes, we'll just simulate registration
    return new Promise((resolve) => {
      setTimeout(() => {
        if (name && email && password) {
          const newUser = { email, name };
          setUser(newUser);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(newUser));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);

  // Don't render children until we've checked for a stored user
  if (!isInitialized) {
    return null; // Or return a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
