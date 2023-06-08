import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function AuthButtonsTest() {
  const { login, signup, logout } = useAuth();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    return () => {
      axios
        .get("/api/user", {
          headers: {
            Authorization:
              "Baerar eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibG9yZGtuZWRsaWsiLCJpYXQiOjE2ODU2MDU0MTN9.QwuU48Hcs-3Y8uOI1L82O62YhyBebWjtEVt3XG8smEE",
          },
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
        login(userData).then((res) => console.log(currentUser));
        break;
      case "logout":
        logout();
    }
  };

  return (
    <div>
      <form onSubmit={handle}>
        <Input
          type="text"
          name="email"
          onChange={handleChange}
          placeholder="email"
        />
        <Input
          type="text"
          name="password"
          onChange={handleChange}
          placeholder="password"
        />
        <Input
          type="text"
          name="phone"
          onChange={handleChange}
          placeholder="phone"
        />

        <Button type="submit" onClick={() => setClicked("login")}>
          Login
        </Button>
        <Button type="submit" onClick={() => setClicked("signup")}>
          Signup
        </Button>
        <Button type="submit" onClick={() => setClicked("logout")}>
          Logout
        </Button>
      </form>
    </div>
  );
}
