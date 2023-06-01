import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// Auth context
const AuthContext = createContext("null");

// Create hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    return () => console.log(currentUser);
  }, [currentUser]);

  const signup = (userData) => {
    const json = JSON.stringify(userData)
    axios
      .post("/signup", userData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
      });
  };

  const login = () => {
    console.log("login");
  };

  const logout = () => {
    console.log("logout");
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
