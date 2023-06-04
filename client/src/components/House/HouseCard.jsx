import React from 'react'

import { Box, Badge, Image } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import { houseProp } from "../../__test__/const";

export default function HouseBox() {

    

  return (
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
              {houseProp.beds} beds &bull; {houseProp.baths} baths
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {houseProp.title}
          </Box>

          <Box>
            {houseProp.formattedPrice}
            <Box as="span" color="gray.600" fontSize="sm">
              / wk
            </Box>
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < houseProp.rating ? "teal.500" : "gray.300"}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {houseProp.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
  )
}
