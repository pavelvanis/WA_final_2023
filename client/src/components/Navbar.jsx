import React from "react";
import { useAuth } from "../hooks/UserAuth";

export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>{currentUser.user.name.first_name}</h1>
      <h2>{currentUser.user.name.last_name}</h2>
    </div>
  );
}
