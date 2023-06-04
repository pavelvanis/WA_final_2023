import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";

export default function useLoadOffers(initialValue) {
  const { currentUser } = useAuth();

  const [value, setValue] = useState(initialValue);

  const load = useRef(false);

  const loadOffers = async () => {
    try {
      console.log('offer axios');
      const offers = await axios.get("/api/offer", {
        headers: {
          // Authorization: `Bearer ${currentUser.token}`,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmV3RW1haWwiLCJpYXQiOjE2ODU2MDc2NTF9.V0t20dgIKD7lOhb4tuslBGPj3Th8Zw6naP73NrKn66k`,
        },
      });
      setValue(offers.data)
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    if (load.current) loadOffers();
    return () => (load.current = true);
  }, []);

  return [value, setValue];
}
