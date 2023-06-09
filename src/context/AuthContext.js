import { ApiLink } from "../ApiLink";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get(`${ApiLink}/auth/check`, {
          withCredentials: true,
        });
        setLoggedIn(true);
        setUser({ username: response.data.user });
      } catch (err) {
        setLoggedIn(false);
        setUser(null);
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, user, setUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
