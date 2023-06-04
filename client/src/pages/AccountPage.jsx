import { useAuth } from "../hooks/useAuth";
import {
  Box,
  Text,
  Divider,
  Card,
  CardHeader,
  CardBody,
  Flex,
} from "@chakra-ui/react";

import { userProps } from "../__test__/const";

// Test data
const offers = [
  {
    name: "offer-1",
  },
  {
    name: "offer-2",
  },
  {
    name: "offer-3",
  },
  {
    name: "offer-4",
  },
  {
    name: "offer-5",
  },
  {
    name: "offer-6",
  },
  {
    name: "offer-7",
  },
  {
    name: "offer-8",
  },
  {
    name: "offer-9",
  },
];
const subs = [
  {
    name: "sub-1",
  },
  {
    name: "sub-2",
  },
  {
    name: "sub-3",
  },
  {
    name: "sub-4",
  },
  {
    name: "sub-5",
  },
  {
    name: "sub-6",
  },
  {
    name: "sub-7",
  },
  {
    name: "sub-8",
  },
  {
    name: "sub-9",
  },
];

export default function AccountPage() {
  const { currentUser } = useAuth();
  console.log(userProps);
  return (
    <Box
      backgroundColor="gray.100"
      rounded="2em"
      border="solid 1px"
      borderColor="gray.400"
      padding="1em"
    >
      <User />
      <Box mt={4}>
        <UserBox title="my offers" items={offers} />
        <UserBox title="my subscribes" items={subs} />
        <UserBox title="my buys" items={subs} />
      </Box>
    </Box>
  );
}

function User() {
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
        <UserName />
        <UserInfo />
      </Box>
      <Divider borderColor="gray.400" />
    </Box>
  );
}

function UserName() {
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
        {userProps.data.name.first_name}
      </Text>
      <Text as="b" fontSize="3xl">
        {userProps.data.name.last_name}
      </Text>
    </Box>
  );
}

function UserInfo() {
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
      <UserColumn title="Phone" info={userProps.data.phone} />
      <UserColumn title="Email" info={userProps.data.email} />
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

function UserBox({ title, items }) {
  return (
    <Box sx={{ p: { base: ".5em", sm: ".7em", md: "1em" } }}>
      <Text textTransform="capitalize" fontWeight={600} fontSize="xl">
        {title}
      </Text>
      <Box overflowX="auto">
        <Flex gap="4" p="4">
          {items.map((offer) => {
            return <Offer offer={offer}></Offer>;
          })}
        </Flex>
      </Box>
    </Box>
  );
}

function Offer({ offer }) {
  return (
    <Card as='div' minWidth={180}>
      <CardHeader>
        <Text size="md">{offer.name}</Text>
      </CardHeader>
      <CardBody>
        <Text>View a summary of all your customers over the last month.</Text>
      </CardBody>
    </Card>
  );
}
