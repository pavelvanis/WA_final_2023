import { useAuth } from "../hooks/useAuth";
import {
  Image,
  Box,
  LinkBox,
  LinkOverlay,
  Text,
  Divider,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Stat,
  StatLabel,
  StatHelpText,
  StatNumber,
  Heading,
} from "@chakra-ui/react";

import { userProps } from "../__test__/const";
import location from "../assets/location.svg";
import country from "../assets/flag.svg";

export default function AccountPage() {
  const { currentUser } = useAuth();
  const user = currentUser.user;

  console.log(user);

  return (
    <Box
      backgroundColor="gray.100"
      rounded="2em"
      border="solid 1px"
      borderColor="gray.400"
      padding="1em"
    >
      <User user={user} />
      <Box mt={4} display="flex" flexDir="column" alignContent="center">
        <UserBox title="my offers" type="offers" items={user.offers} />
        <UserBox title="my houses" type="houses" items={user.houses} />
      </Box>
    </Box>
  );
}

function User({ user }) {
  return (
    <Box>
      <Box
        display="flex"
        paddingX="1em"
        mb="1.2em"
        sx={{
          flexDirection: { base: "column", md: "row" },
          justifyContent: { base: "center", md: "space-between" },
          alignItems: { base: "start", md: "center" },
          gap: { base: "1.5em", sm: ".8em" },
        }}
      >
        <UserName name={user} />
        <UserInfo user={user} />
      </Box>
      <Divider borderColor="gray.400" />
    </Box>
  );
}

function UserName({ name }) {
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: { base: "column", sm: "row" },
        alignItems: "start",
        gap: { sm: ".55em" },
      }}
    >
      <Text as="b" fontSize="3xl">
        {name.first_name}
      </Text>
      <Text as="b" fontSize="3xl">
        {name.last_name}
      </Text>
    </Box>
  );
}

function UserColumn({ title, info }) {
  return (
    <Box display="flex" gap=".3em">
      <Text fontWeight={600}>{title}:</Text>
      <Text>{info}</Text>
    </Box>
  );
}

function UserInfo({ user }) {
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: { base: "column", sm: "row" },
        alignItems: { base: "start", sm: "center" },
        gap: { base: ".2em", sm: "2em" },
        mr: { md: "1em" },
      }}
    >
      <UserColumn title="Phone" info={user.phone} />
      <UserColumn title="Email" info={user.email} />
    </Box>
  );
}

function UserBox({ title, items, type }) {
  return (
    <Box sx={{ p: { base: ".5em", sm: ".7em", md: "1em" } }}>
      <Text textTransform="capitalize" fontWeight={600} fontSize="xl">
        {title}
      </Text>
      {items.length > 0 ? (
        <MyBox items={items} type={type} />
      ) : (
        <EmptyBox text={type} />
      )}
    </Box>
  );
}

function Offer({ offer }) {
  const formattedValue = offer.attributes.value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const dateString = offer.attributes.date;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("cs-CZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <LinkBox as="article">
      <LinkOverlay href="#">
        <Card minWidth={180}>
          <CardHeader sx={{ p: { base: ".5em", sm: "1em" } }} pb={0}>
            <Image rounded={5} src="https://via.placeholder.com/300x150" />
          </CardHeader>
          <CardBody sx={{ p: { base: ".5em", sm: "1em" } }}>
            <Stat>
              <StatLabel display="flex" justifyContent="start" gap="1.3em">
                <Box display="flex" alignItems="center" gap=".4em">
                  <Image boxSize="1em" src={country} />
                  <Text>{}</Text>
                </Box>
                <Box display="flex" alignItems="center" gap=".4em">
                  <Image boxSize="1em" src={location} />
                  <Text>{}</Text>
                </Box>
              </StatLabel>
              <StatNumber mt={1}>€{formattedValue}</StatNumber>
              <StatHelpText mt={2}>{formattedDate}</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </LinkOverlay>
    </LinkBox>
  );
}

function House({ house }) {
  const area = `${house.props.sqft} m²`;
  return (
    <LinkBox as="article">
      <LinkOverlay href="#">
        <Card minWidth={180}>
          <CardHeader sx={{ p: { base: ".5em", sm: "1em" } }}>
            <Image rounded={5} src="https://via.placeholder.com/300x150" />
          </CardHeader>
          <CardBody sx={{ p: { base: ".5em", sm: "1em" } }}>
            <Stat>
              <StatLabel display="flex" justifyContent="start" gap="1.3em">
                <Box display="flex" alignItems="center" gap=".4em">
                  <Image boxSize="1em" src={country} />
                  <Text>{house.address.country}</Text>
                </Box>
                <Box display="flex" alignItems="center" gap=".4em">
                  <Image boxSize="1em" src={location} />
                  <Text>{house.address.city}</Text>
                </Box>
              </StatLabel>
              <StatNumber mt={1}>{house.props.house_type}</StatNumber>
              <StatHelpText mt={2}>{area}</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </LinkOverlay>
    </LinkBox>
  );
}

function MyBox({ items, type }) {
  return (
    <Box overflowX="auto">
      <Flex gap="4" p="4">
        {items.map((item) => {
          switch (type) {
            case "offers":
              return <Offer key={item["_id"]} offer={item}></Offer>;

            case "houses":
              return <House key={item["_id"]} house={item}></House>;

            case "subs":
              return <Sub key={item["_id"]} sub={item}></Sub>;
          }
        })}
      </Flex>
    </Box>
  );
}

function EmptyBox({ text }) {
  return (
    <Box
      mt={4}
      maxW="15em"
      border="solid 2px"
      borderRadius={5}
      borderColor="gray.300"
      borderStyle="dashed"
      p={5}
      py="4.5em"
      sx={{ marginX: { base: "auto", sm: "0" } }}
    >
      <Heading
        textAlign="center"
        fontSize="3xl"
        color="gray.400"
        fontWeight={100}
      >
        No {text}
      </Heading>
    </Box>
  );
}
