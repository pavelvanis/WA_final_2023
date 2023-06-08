import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const load = useRef(false);
  const isReady = useRef(false);

  const [houses, setHouses] = useState(currentUser.user.houses);
  const [offers, setOffers] = useState(currentUser.user.offers);

  useEffect(() => {
    if (load.current && isReady.current) {
      console.log("changed");
      updateAttributes();
    }

    return () => (load.current = true);
  }, [houses, offers]);

  const saveHouse = (house) => {
    isReady.current = true;
    setHouses([...houses, house]);
  };

  const saveOffer = (offer) => {
    isReady.current = true;
    setOffers([...offers, offer]);
  };

  const props = {
    saveHouse,
    saveOffer,
  };

  const updateAttributes = async () => {
    const data = {
      attributes: {
        ...currentUser.user.attributes,
        houses,
        offers,
      },
    };
    console.log(data);
    try {
      const response = await axios.patch(
        `/api/user/${currentUser.user["_id"]}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    isReady.current = false;
  };

  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};
