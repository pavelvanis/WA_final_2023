import { Box, Button, Image, Text, Container, Heading } from "@chakra-ui/react";

import logo from "../assets/logo.svg";
import background01 from "../assets/estate-background-04.jpeg";

export default function WelcomePage() {
  console.log("welcome");
  return (
    <Box
      color="black"
      minHeight="100vh"
      backgroundColor="gray.800"
      bgImage={background01}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Box
        display="flex"
        sx={{
          justifyContent: "space-between",
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
            fontSize="4xl"
            fontWeight={600}
            fontFamily="Slackside One, cursive"
          >
            House Estate
          </Text>
        </Box>
        <Button size="sm">Sign in</Button>
      </Box>
      <Container mt="2em" fontSize="1.4rem">
        <Heading sx={{ fontSize: { base: "6xl", md: "8xl" } }} mb={9}>
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
        <Button colorScheme="blackAlpha" size="md" mt={8}>
          Register
        </Button>
      </Container>
    </Box>
  );
}
