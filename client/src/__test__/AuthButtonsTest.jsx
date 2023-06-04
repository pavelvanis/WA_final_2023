import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
export default function AuthButtonsTest() {
  const { login, signup, logout } = useAuth();

  useEffect(() => {
    return () => {
      axios
        .get("/api/user", {
          headers: {
            Authorization: 'Baerar eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibG9yZGtuZWRsaWsiLCJpYXQiOjE2ODU2MDU0MTN9.QwuU48Hcs-3Y8uOI1L82O62YhyBebWjtEVt3XG8smEE'
          }
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
  }, []);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    phone: "",
    name: {
      first_name: "",
      last_name: "",
    }
  });

  const [clicked, setClicked] = useState();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handle = (e) => {
    e.preventDefault();
    switch (clicked) {
      case "signup":
        signup(userData);
        break;
      case "login":
        login(userData);
        break;
      case "logout":
        logout();
    }
  };

  return (
    <div>
      <form onSubmit={handle}>
        <input type="text" name="email" onChange={handleChange} placeholder='email' />
        <input type="text" name="password" onChange={handleChange} placeholder='password' />
        <input type="text" name="phone" onChange={handleChange} placeholder='phone' />
        
        <button type="submit" onClick={() => setClicked("login")}>
          Login
        </button>
        <button type="submit" onClick={() => setClicked("signup")}>
          Signup
        </button>
        <button type="submit" onClick={() => setClicked("logout")}>
          Logout
        </button>
      </form>
    </div>
  );
}
