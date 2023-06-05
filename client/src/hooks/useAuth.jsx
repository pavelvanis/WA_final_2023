import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";

// Auth context
const AuthContext = createContext("null");

// Create hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(loadSession());
  const load = useRef(false);

  useEffect(() => {
    // console.log("user changed");
    // console.log(loadSession());
  }, [currentUser]);

  useEffect(() => {
    if (load.current) {
      // setCurrentUser(loadSession());
      // console.log(loadSession());
      // console.log("session restarted");
    }
    return () => (load.current = true);
  }, []);

  const signup = async (userData) => {
    try {
      const response = await axios.post("/signup", userData);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const login = async (data) => {
    try {
      const response = await axios.post("/login", {
        username: data.username,
        password: data.password,
      });
      const result = {
        token: response.data.token,
        user: response.data.data[0],
      };
      setCurrentUser(result);
      saveSession(result);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logout = () => {
    // console.log('logout');
    setCurrentUser(null);
    sessionStorage.setItem("user", null);
  };

  const methods = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={methods}>{children}</AuthContext.Provider>
  );
};

function saveSession(user) {
  if (!user) return;
  const json = JSON.stringify(user);
  sessionStorage.setItem("user", json);
}

function loadSession() {
  let data = sessionStorage.getItem("user");
  if (data) data = JSON.parse(data);
  return data;
}
