import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";

export default function useLoadOffers(initialValue) {
  const { currentUser } = useAuth();

  const [value, setValue] = useState(initialValue);

  const load = useRef(false);


  const loadOffers = async () => {
    try {
      const offers = await axios.get("/api/offer", {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
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

  return value
}
