import { createContext, useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigateRef = useRef();

  // Navigation setter component
  const NavigationSetter = () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigateRef.current = navigate;
    }, [navigate]);
    return null;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const register = async (userData, isAdmin = false) => {
    try {
      const endpoint = isAdmin
        ? `${process.env.REACT_APP_API_URL}/api/auth/register/admin`
        : `${process.env.REACT_APP_API_URL}/api/auth/register/customer`;
      const { data } = await axios.post(endpoint, userData);
      return { success: true, message: data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const login = async (email, password, isAdmin = false) => {
    try {
      const endpoint = isAdmin
        ? `${process.env.REACT_APP_API_URL}/api/auth/login/admin`
        : `${process.env.REACT_APP_API_URL}/api/auth/login/customer`;
      const { data } = await axios.post(endpoint, { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigateRef.current?.("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
      <NavigationSetter />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
