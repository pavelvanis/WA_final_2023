import React, { useEffect, useRef } from "react";
import {
  Wrap,
  Box,
  Image,
  Badge,
  LinkBox,
  LinkOverlay,
  Text,
  Container,
} from "@chakra-ui/react";
import { useLoadOffers } from "../hooks/";
import { houseProp } from "../__test__/const";
import { StarIcon } from "@chakra-ui/icons";

export default function HomePage() {
  return (
    <div>
      <HouseContainer />
    </div>
  );
}

function HouseContainer() {
  const [offers, setOffers] = useLoadOffers();
  const load = useRef(false);

  useEffect(() => {
    console.log(offers);
  }, [offers]);

  return (
    <Wrap spacingY="3em" spacingX="2em" justify="space-evenly">
      {offers &&
        offers.map((offer) => {
          return <MyCard key={offer["_id"]} data={offer} />;
        })}
    </Wrap>
  );
}

function MyCard({ data }) {
  const formattedValue = data.attributes.value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <LinkBox>
      <LinkOverlay href="/#">
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={houseProp.imageUrl} alt={houseProp.imageAlt} />

          <Box p="6">
            <Box display="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {data.house[0].adress.country} &bull;{" "}
                {data.house[0].adress.city}
              </Box>
            </Box>

            <Box
              mt="2"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {data.house[0].props.description}
            </Box>
            <Box mt={0}>
              <Box as="span" color="gray.600" mr=".1em">
                €
              </Box>
              {formattedValue}
            </Box>

            <Box
              display="flex"
              mt="2"
              alignItems="center"
              fontSize="sm"
              color="gray.600"
            >
              {`${data.house[0].props.sqft} m²`} &bull;{" "}
              {data.house[0].props.house_type}
            </Box>
          </Box>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
}
