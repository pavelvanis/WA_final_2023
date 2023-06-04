import React, { useState } from "react";
import {
  Box,
  Flex,
  Spacer,
  Link,
  Button,
  IconButton,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import { HamburgerIcon, SmallAddIcon, InfoIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <header>
      <Box bg="gray.800" p={4} color="white" position='relative'>
        <Flex alignItems="center">
          <Link href="#" mr={4}>
            Logo
          </Link>
          <Spacer />
          <Box
            display={{ base: "none", sm: "flex" }}
            alignItems="center"
            gap="1.5em"
          >
            <Link href="#">Home</Link>
            <Link href="#">Offers</Link>
            <Button colorScheme="teal" paddingX={2}>
              <SmallAddIcon boxSize={7} />
              Add offer
            </Button>
            <NavAvatar />
          </Box>
          <Box display={{ base: "block", sm: "none" }}>
            <IconButton
              icon={<HamburgerIcon boxSize={8} />}
              onClick={onToggle}
              variant="unstyled"
              aria-label="Open Menu"
            />
          </Box>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Box mt={4} p={4} color="white">
            <Link href="#" mb={2} display="block">
              Home
            </Link>
            <Link href="#" mb={2} display="block">
              About
            </Link>
            <Link href="#" mb={2} display="block">
              Contact
            </Link>
            <Button mt={4} colorScheme="teal" display="block" w="100%">
              Sign In
            </Button>
          </Box>
        </Collapse>
      </Box>
    </header>
  );
};

export default Navbar;

function NavLink() {}

function NavAvatar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <IconButton
        icon={<InfoIcon boxSize={9} />}
        rounded="100%"
        onClick={onToggle}
        aria-label="Toggle Collapse"
      />
    </>
  );
}
