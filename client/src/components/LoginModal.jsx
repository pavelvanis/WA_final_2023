import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginModal({ isOpen, onClose, openRegister }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState({
    username: false,
    password: false,
    badlogin: false,
  });

  //   Checks form inputs
  function validForm() {
    setError({
      ...error,
      username: user.username ? false : true,
      password: user.password ? false : true,
    });
    if (!user.username || !user.password) return false;
    return true;
  }

  //   Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validForm()) return;
      const res = await login(user);
      // console.log(res);
      if (res.status === 200) {
        navigate("/home");
      }
    } catch (err) {
      setError({ ...error, badlogin: true });
      // console.log(err);
    }
  };

  //   Handle closing modal
  const handleClose = (e) => {
    setError({
      username: false,
      password: false,
      badlogin: false,
    });
    onClose();
  };

  //   Opens Registration modal
  const goToRegister = (e) => {
    e.preventDefault();
    handleClose();
    openRegister();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl">Sign In</ModalHeader>
        <LoginForm
          error={{ state: error, setError: setError }}
          user={{ user: user, setUser: setUser }}
        />
        <ModalFooter
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button size="sm" onClick={goToRegister}>
            Sign Up
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
      <FormControl isInvalid={error.state.badlogin}>
        <FormControl isInvalid={error.state.username}>
          <Input
            placeholder="Email or phone"
            name="username"
            onChange={handleChange}
          />
          <FormErrorMessage>Email is required.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={error.state.password}>
          <Input
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleChange}
            mt={4}
          />
          <FormErrorMessage>Password is required.</FormErrorMessage>
        </FormControl>
        <FormErrorMessage>Bad password or email</FormErrorMessage>
      </FormControl>
    </ModalBody>
  );
}
