import React, { useRef, useEffect } from "react";

import { Wrap } from "@chakra-ui/react";
import { useLoadOffers } from "../../hooks";
import { HouseCard } from "../../components";

export default function HouseContainer() {
  const [offers, setOffers] = useLoadOffers("offers");
  const load = useRef(false);

  useEffect(() => {
    console.log(offers);
  }, [offers]);

  return (
    <Wrap spacingY="3em" spacingX="2em" justify="space-evenly">
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
      <HouseCard />
    </Wrap>
  );
}
