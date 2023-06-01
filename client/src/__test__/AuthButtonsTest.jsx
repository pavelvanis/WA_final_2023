import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/UserAuth";

export default function AuthButtonsTest() {
  const { login, signup, logout } = useAuth();

  const [userData, setUserData] = useState({
    email: "test.email@email.cz",
    password: "someHASH",
    phone: "+420 123 456 789",
    name: {
      first_name: "Thomas",
      last_name: "Hornning",
    },
    attributes: {
      offers: [],
      houses: [],
      subscribes: [],
    },
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

  useEffect(() => {
    return () => {
      console.log(userData);
    };
  }, [userData]);

  return (
    <div>
      <form onSubmit={handle}>
        <input type="text" name="email" onChange={handleChange} />
        <input type="text" name="password" onChange={handleChange} />
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
