import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  CheckboxIcon,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Textarea,
} from "@chakra-ui/react";

import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

export default function CreateOfferModal({ isOpen, onClose }) {
  const { currentUser } = useAuth();

  const [house, setHouse] = useState({
    address: {
      country: null,
      city: null,
      line: null,
    },
    features: {
      garden: false,
      pool: false,
      garage: false,
      cooling: false,
    },
    props: {
      sqft: 0,
      built_year: 0,
      house_type: null,
      description: null,
    },
  });

  const [offer, setOffer] = useState({
    userId: currentUser.user["_id"],
    attributes: {
      value: 30000,
    }
  });

  const [error, setError] = useState({
    address: {
      country: false,
      city: false,
      line: false,
    },
    props: {
      sqft: false,
      built_year: false,
      house_type: false,
      description: false,
    },
  });

  // useEffect(() => {
  //   console.log(error);
  // }, [error])

  const validForm = () => {
    setError({
      ...error,
      address: {
        country: house.address.country ? false : true,
        city: house.address.city ? false : true,
        line: house.address.line ? false : true,
      },
      props: {
        sqft: house.props.sqft ? false : true,
        built_year: house.props.built_year ? false : true,
        house_type: house.props.house_type ? false : true,
        description: house.props.description ? false : true,
      },
    });
    if (
      !house.address.country ||
      !house.address.city ||
      !house.address.line ||
      !house.props.sqft ||
      !house.props.built_year ||
      !house.props.house_type ||
      !house.props.description
    )
      return false;
    return true;
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    if (!validForm()) return;
    console.log(house);
    try {
      const createHouse = await axios.post(
        "/api/house",
        { ...house },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      console.log(createHouse);
      if (createHouse.status !== 200) return;
      const createOffer = await axios.post(
        "/api/offer",
        {
          houseId: createHouse.data["_id"],
          ...offer,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      console.log(createOffer);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal size="5xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader py={5} fontSize="2xl">
          Create offer
        </ModalHeader>
        <Divider width="97%" m="auto" />
        <ModalBody>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Rozložení sloupců pro různá zařízení
            gap="4em"
            px={9}
            py={4}
            mt={3} // Odstup mezi prvky v gridu
          >
            <AddressBox
              error={{ state: error, setError: setError }}
              house={{ house: house, setHouse: setHouse }}
            />
            <PhototsBox />
            <FeaturesBox
              error={{ state: error, setError: setError }}
              house={{ house: house, setHouse: setHouse }}
            />
            <BuildingBox
              error={{ state: error, setError: setError }}
              house={{ house: house, setHouse: setHouse }}
            />
          </Grid>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="end" alignItems="center">
          <Box display="flex" gap={3} alignItems="center">
            <Button
              leftIcon={<CheckIcon />}
              colorScheme="blue"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <IconButton
              bg="transparent"
              icon={<CloseIcon />} //
              aria-label="Button label"
              onClick={handleClose}
            />
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function AddressBox({ error, house }) {
  const handleChange = (e) => {
    error.setError({
      ...error.state,
      address: { ...error.state.address, [e.target.name]: false },
    });
    house.setHouse({
      ...house.house,
      address: {
        ...house.house.address,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <GridItem>
      <Heading mb=".6em" fontSize="2xl">
        Address
      </Heading>
      <Box pl={2} display="flex" flexDirection="column" gap="1em">
        <FormControl isRequired isInvalid={error.state.address.country}>
          <FormLabel fontSize="sm" mb="0">
            Country
          </FormLabel>
          <Input
            variant="flushed"
            placeholder="Czechia"
            size="sm"
            width="50%"
            name="country"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired isInvalid={error.state.address.city}>
          <FormLabel fontSize="sm" mb="0">
            City
          </FormLabel>
          <Input
            variant="flushed"
            name="city"
            placeholder="Prague"
            size="sm"
            width="50%"
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired isInvalid={error.state.address.line}>
          <FormLabel fontSize="sm" mb="0">
            Address line
          </FormLabel>
          <Input
            variant="flushed"
            placeholder="Hanzlova 20"
            size="sm"
            name="line"
            width="50%"
            onChange={handleChange}
          />
        </FormControl>
      </Box>
    </GridItem>
  );
}

function PhototsBox() {
  return (
    <GridItem>
      <Heading fontSize="2xl">Photos</Heading>
    </GridItem>
  );
}

function FeaturesBox({ house }) {
  const handleChange = () => {
    house.setHouse({
      ...house.house,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <GridItem>
      <Heading mb=".7em" fontSize="2xl">
        Features
      </Heading>
      <Box pl={2} display="flex" flexDirection="column" gap="1em">
        <Checkbox width="25%" name="garden">
          Garden
        </Checkbox>
        <Checkbox width="25%" name="">
          Pool
        </Checkbox>
        <Checkbox width="25%">Garage</Checkbox>
        <Checkbox width="25%">Cooling</Checkbox>
      </Box>
    </GridItem>
  );
}

function BuildingBox({ error, house }) {
  const handleChange = (e) => {
    error.setError({
      ...error.state,
      props: { ...error.state.props, [e.target.name]: false },
    });
    house.setHouse({
      ...house.house,
      props: {
        ...house.house.props,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <GridItem display="flex" flexDirection="column" gap="1em">
      <Heading fontSize="2xl">Building</Heading>

      <FormControl isRequired isInvalid={error.state.props.sqft}>
        <NumberInput size="sm" min={10} max={9999}>
          <FormLabel fontSize="sm">Build square footage</FormLabel>
          <NumberInputField
            placeholder="230"
            variant="flushed"
            size="sm"
            width="30%"
            onChange={handleChange}
            name="sqft"
          />
        </NumberInput>
      </FormControl>

      <FormControl isRequired isInvalid={error.state.props.built_year}>
        <NumberInput size="sm" min={1899} max={new Date().getFullYear()}>
          <FormLabel fontSize="sm">Built year</FormLabel>
          <NumberInputField
            placeholder="2006"
            variant="flushed"
            size="sm"
            width="30%"
            onChange={handleChange}
            name="built_year"
          />
        </NumberInput>
      </FormControl>

      <FormControl isRequired isInvalid={error.state.props.house_type}>
        <FormLabel fontSize="sm" mb="0">
          House type
        </FormLabel>
        <Input
          variant="flushed"
          placeholder="e.g. Single Family"
          size="sm"
          width="30%"
          onChange={handleChange}
          name="house_type"
        />
      </FormControl>

      <FormControl isRequired isInvalid={error.state.props.description}>
        <FormLabel fontSize="sm">Description</FormLabel>
        <Textarea
          placeholder="Write some description about house here"
          size="sm"
          width="80%"
          onChange={handleChange}
          name="description"
        />
      </FormControl>
    </GridItem>
  );
}
