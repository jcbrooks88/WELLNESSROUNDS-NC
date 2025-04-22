import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";

interface UserType {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: UserType | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  token: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const login = (newToken: string) => {
    try {
      localStorage.setItem("token", newToken);
      const decoded = jwtDecode<{ data: UserType; exp: number }>(newToken);
      setUser(decoded.data);
      setToken(newToken);
    } catch (error) {
      console.error("Invalid token on login");
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch('/api/refresh-token', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Token refresh failed');

      const data = await response.json();
      login(data.accessToken);
      return data.accessToken;
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<{ data: UserType; exp: number }>(token);
        const currentTime = Date.now() / 1000;
        const timeLeft = decoded.exp - currentTime;

        if (timeLeft <= 0) {
          refreshToken();
        } else {
          setUser(decoded.data);

          const refreshTimer = setTimeout(() => {
            refreshToken();
          }, (timeLeft - 30) * 1000); // Refresh 30 seconds before expiry

          return () => clearTimeout(refreshTimer);
        }
      } catch (error) {
        console.error("Token decoding error", error);
        logout();
      }
    }
  }, [token]);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
