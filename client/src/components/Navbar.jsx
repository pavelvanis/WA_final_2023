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
  Image,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, SmallAddIcon, InfoIcon } from "@chakra-ui/icons";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import CreateOfferModal from "./CreateOfferModal";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <header>
      <Box bg="gray.800" p={4} color="white" position="relative">
        <Flex alignItems="center">
          <Box display="flex" gap="4em" alignItems="center">
            <Image
              ml={6}
              boxSize="4em"
              src={logo}

              sx={{ display: { base: "none", sm: "block" } }}
            />
            <Text
              color="white"
              fontSize="5xl"
              fontWeight={100}
              fontFamily="Copykey"
            >
              House Estate
            </Text>
          </Box>

          <Spacer />
          <Box
            display={{ base: "none", sm: "flex" }}
            alignItems="center"
            gap="1.5em"
          >
            <Link fontSize='1.2em' href="/home">Home</Link>
            <Link fontSize='1.2em' href="/account">Profile</Link>
            <AddOfferBtn />
            <LogOut />
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
          <Box mt={4} p={4} color="white" textAlign="center" fontSize="1.1em">
            <Link href="/home" mb={2} display="block">
              Home
            </Link>
            <Link href="/account" mb={2} display="block">
              Profile
            </Link>
            <LogOut />
          </Box>
        </Collapse>
      </Box>
    </header>
  );
};

export default Navbar;

function LogOut() {
  const { logout } = useAuth();
  return (
    <Button sx={{mt: {base: '.6em', sm: '0'}}} onClick={logout}>
      <FaSignOutAlt />
    </Button>
  );
}

function AddOfferBtn() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="teal" paddingX={2} onClick={onOpen}>
        <SmallAddIcon boxSize={7} />
        Add offer
      </Button>
      <CreateOfferModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
