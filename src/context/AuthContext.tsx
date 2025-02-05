import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

interface AuthContextType {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate(); // useNavigate should work only when RouterProvider is properly set

  useEffect(() => {
    // Check if the token exists in localStorage when the app loads
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true); // User is authenticated if there's a token
    } else {
      setIsAuthenticated(false); // User is not authenticated if no token
      navigate({to:'/login'}); // Redirect to the login page if no token found
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export default AuthProvider