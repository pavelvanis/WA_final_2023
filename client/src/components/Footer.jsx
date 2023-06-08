import React from "react";

import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { FaHome, FaInfoCircle, FaGithub} from 'react-icons/fa'

export default function Footer() {
  return (
    <Box bg="gray.800" py={6} color="white">
      <Flex alignItems="center" gap='1em' justifyContent="center">
        <Link href="#" mr={4} display="flex" mb={1} gap='.4em' alignItems="center">
          <FaHome mr={2} size='1.4em' />
          Home
        </Link>
        <Link href="#" mr={4} display="flex" pb={1} gap='.4em' alignItems="center">
          <FaGithub mr={2} size='1.4em' />
          GitHub
        </Link>
      </Flex>
      <Text mt={5} fontSize='.9em' textAlign="center">
        © 2023 Pavel Vaniš
      </Text>
    </Box>
  );
}
