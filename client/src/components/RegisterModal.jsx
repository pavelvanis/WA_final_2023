import React, { useEffect, useState } from "react";

import {
  CheckIcon,
  CloseIcon,
  EmailIcon,
  InfoOutlineIcon,
  PhoneIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// Register Modal

export default function RegisterModal({ isOpen, onClose, openLogin }) {
  const { signup, login } = useAuth();
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: null,
    password: null,
    phone: null,
    first_name: null,
    last_name: null,
  });

  const [error, setError] = useState({
    email: false,
    password: false,
    phone: false,
    first_name: false,
    last_name: false,
    anotherError: { status: true, message: "" },
  });

  //   Checks form inputs
  const validForm = () => {
    setError({
      ...error,
      email: user.email ? false : true,
      password: user.password ? false : true,
      phone: user.phone ? false : true,
      first_name: user.first_name ? false : true,
      last_name: user.last_name ? false : true,
    });
    if (
      !user.email ||
      !user.password ||
      !user.phone ||
      !user.first_name ||
      !user.last_name
    )
      return false;
    return true;
  };

  //   Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validForm()) return;
      const res1 = await signup(user);
    //   console.log(res1);
      const res2 = await login({username: user.email, password: user.password});
    //   console.log(res2);
      if (res2.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      setError({
        ...error,
        anotherError: {
          status: true,
          message: error.response.data.error.message,
        },
      });
    //   console.log(error);
    }
  };

  //   Handle closing modal
  const handleClose = (e) => {
    setError({
      email: false,
      password: false,
      phone: false,
      first_name: false,
      last_name: false,
      anotherError: { status: true, message: "" },
    });
    onClose();
  };

  //   Opens login modal
  const goToLogin = (e) => {
    e.preventDefault();
    handleClose();
    openLogin();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl">Sign Up</ModalHeader>

        <LoginForm
          error={{ state: error, setError: setError }}
          user={{ user: user, setUser: setUser }}
        />

        <ModalFooter
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button size="sm" onClick={goToLogin}>
            Sign In
          </Button>
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
              icon={<CloseIcon />}
              aria-label="Button label"
              onClick={handleClose}
            />
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function LoginForm({ user, error }) {
  const handleChange = (e) => {
    error.setError({ ...error.state, [e.target.name]: false });
    user.setUser({
      ...user.user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ModalBody>
      <FormControl isInvalid={error.state.anotherError.status}>
        <FormControl isInvalid={error.state.email}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <EmailIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </InputGroup>
          <FormErrorMessage>Email is required.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={error.state.password}>
          <InputGroup mt={4}>
            <InputLeftElement pointerEvents="none">
              <ViewIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </InputGroup>

          <FormErrorMessage>Password is required.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={error.state.phone}>
          <InputGroup mt={6}>
            <InputLeftElement pointerEvents="none">
              <PhoneIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Phone number"
              type="tel"
              name="phone"
              onChange={handleChange}
            />
          </InputGroup>
          <FormErrorMessage>Phone number is required.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={error.state.first_name}>
          <InputGroup mt={6}>
            <InputLeftElement pointerEvents="none">
              <InfoOutlineIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="First name"
              type="text"
              name="first_name"
              onChange={handleChange}
            />
          </InputGroup>
          <FormErrorMessage>First name is required.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={error.state.last_name}>
          <InputGroup mt={4}>
            <InputLeftElement pointerEvents="none">
              <InfoOutlineIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Last name"
              type="text"
              name="last_name"
              onChange={handleChange}
            />
          </InputGroup>
          <FormErrorMessage>Last name is required.</FormErrorMessage>
        </FormControl>

        <FormErrorMessage>{error.state.anotherError.message}</FormErrorMessage>
      </FormControl>
    </ModalBody>
  );
}
