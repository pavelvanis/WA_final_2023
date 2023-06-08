import { Box, Button, Image, Text, Container, Heading } from "@chakra-ui/react";

import logo from "../assets/logo.svg";
import background from "../assets/estate-background-04.jpeg";
import { LoginModal, RegisterModal } from "../components";
import { useState } from "react";

export default function WelcomePage() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const openLoginModal = () => {
    setLoginOpen(true);
  };

  const closeLoginModal = () => {
    setLoginOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterOpen(false);
  };

  return (
    <Box
      color="black"
      minHeight="100vh"
      backgroundColor="gray.800"
      bgImage={background}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Box
        display="flex"
        sx={{
          justifyContent: "space-between",
          flexDir: { base: "column", sm: "row" },
          alignItems: "center",
          p: "1.5em",
          pt: { sm: ".7em" },
        }}
      >
        <Box display="flex" gap="4.5em" alignItems="center">
          <Image
            ml={6}
            boxSize="5em"
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
        <LoginBtn onClick={openLoginModal} />
        <LoginModal
          isOpen={isLoginOpen}
          onClose={closeLoginModal}
          openRegister={openRegisterModal}
        />
      </Box>
      <Container py="2.4em" fontSize="1.4rem">
        <Heading sx={{ fontSize: { base: "6xl", md: "8xl" } }} mb=".7em">
          Welcome to our real estate platform!{" "}
        </Heading>
        <Text fontWeight="semibold" fontSize="2xl">
          Here you will find a wide range of houses and properties available for
          you. Explore the current listings and take advantage of the
          opportunity to make your own offers.
        </Text>
        <Text fontWeight="semibold" fontSize="2xl" mt={3}>
          Whether you are looking for a new home or want to showcase your
          property for sale or rent, this is the place to be.
        </Text>
        <RegisterBtn onClick={openRegisterModal} />
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={closeRegisterModal}
          openLogin={openLoginModal}
        />
      </Container>
    </Box>
  );
}

function LoginBtn({ onClick }) {
  return (
    <Button sx={{mt: {base: '4em', sm: '0'}}} onClick={onClick} size="sm">
      Sign In
    </Button>
  );
}

function RegisterBtn({ onClick }) {
  return (
    <Button mt={7} size="md" colorScheme="blackAlpha" onClick={onClick}>
      Sign Up
    </Button>
  );
}
