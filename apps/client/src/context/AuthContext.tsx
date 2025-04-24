import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useApolloClient } from "@apollo/client";
import { REFRESH_TOKEN_MUTATION } from "../graphql/user/mutations.js";

interface UserType {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: UserType | null;
  login: (accessToken: string, user: UserType) => void;
  register: (accessToken: string, user: UserType) => void;
  logout: () => void;
  isAuthenticated: boolean;
  token: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const client = useApolloClient(); // Apollo Client instance
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const login = (accessToken: string, user: UserType) => {
    try {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user)); // Save the user object as well
      const decoded = jwtDecode<{ data: UserType; exp: number }>(accessToken);
      setUser(decoded.data);
      setToken(accessToken);
    } catch (error) {
      console.error("Invalid token on login");
    }
  };
  
  const register = (accessToken: string, user: UserType) => login(accessToken, user);

  const refreshToken = async () => {
    try {
      const { data } = await client.mutate({ mutation: REFRESH_TOKEN_MUTATION });
      const newToken = data.refreshAccessToken.token;
      const decoded = jwtDecode<{ data: UserType; exp: number }>(newToken);
      login(newToken, decoded.data);
      return newToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      return null;
    }
  };

  const scheduleRefresh = (exp: number) => {
    const currentTime = Date.now() / 1000;
    const timeLeft = exp - currentTime;

    if (timeLeft > 30) {
      const refreshTimer = setTimeout(async () => {
        const newToken = await refreshToken();
        if (newToken) {
          const decoded = jwtDecode<{ data: UserType; exp: number }>(newToken);
          scheduleRefresh(decoded.exp); // Reschedule with new expiry
        }
      }, (timeLeft - 30) * 1000);

      return refreshTimer;
    }
    return null;
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<{ data: UserType; exp: number }>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp <= currentTime) {
          refreshToken();
        } else {
          setUser(decoded.data);
          const timer = scheduleRefresh(decoded.exp);
          return () => {
            if (timer) {
              clearTimeout(timer);
            }
          };
        }
      } catch (error) {
        console.error("Token decode error:", error);
        logout();
      }
    }
  }, [token]);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
