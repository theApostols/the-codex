import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Text,
  Link,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const MotionContainer = motion(Container);

function LoginForm() {
  const {
    isOpen: isOpenError,
    onOpen: onOpenError,
    onClose: onCloseError,
  } = useDisclosure();
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  // Updates the state when the user checks or unchecks the checkbox.
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const [loginUser, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  //function to handle displaying an error modal
  const handleErrorMessage = async (error) => {
    let errorDetails; //variable to hold detailed error message

    //provides additional error details for specific errors
    if (
      error.message ===
      "Failed to log in; Unable to log in using the provided details. Please try again."
    ) {
      errorDetails =
        "Unable to log in using the provided details. Please try again.";
    } else {
      errorDetails = error.message;
    }

    //sets error message & opens error modal
    setErrorMessage(errorDetails);
    onOpenError();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      const { token, user } = data.loginUser;
      // If 'Remember Me' is checked, save in localStorage; otherwise, sessionStorage.
      if (rememberMe) {
        localStorage.setItem("authToken", token);
      } else {
        sessionStorage.setItem("authToken", token);
      }

      Auth.login(token);
    } catch (err) {
      console.error("Login failed. Error:", err);
      handleErrorMessage(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Box
          bgImage="url('/images/home/login.png')"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="40%"
          minH="50vh"
          py="12"
          px={{ base: "4", lg: "8" }}
          d="flex"
          alignItems="center"
          justifyContent="center"
        >
          <MotionContainer
            centerContent
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <VStack
              spacing="4"
              w="full"
              maxW="md"
              mx="auto"
              p="8"
              borderRadius="lg"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
              border="1px solid rgba(255, 255, 255, 0.2)"
              bg="rgba(45, 55, 72, 0.8)"
              backdropFilter="saturate(100%) blur(10px)"
              color="white"
            >
              <Heading fontSize="2xl">Login</Heading>
              <FormControl id="email" isRequired>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  autoComplete="email"
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  value={userFormData.email}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  autoComplete="new-password"
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  value={userFormData.password}
                />
              </FormControl>

              <Checkbox
                colorScheme="purple"
                isChecked={rememberMe}
                onChange={handleRememberMeChange}
              >
                Remember me
              </Checkbox>
              <Button
                disabled={!(userFormData.email && userFormData.password)}
                type="submit"
                w="full"
                colorScheme="purple"
                mt="4"
              >
                Login
              </Button>

              {/* Error message modal */}
              <Modal isOpen={isOpenError} onClose={onCloseError}>
                <ModalOverlay />
                <ModalContent bg="codex.accents" color="codex.darkest">
                  <ModalHeader>Oops! An error occured.</ModalHeader>
                  <ModalBody>
                    <Text>{errorMessage}</Text>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="secondary" mr={3} onClick={onCloseError}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Text mt="6">
                Don't have an account?{" "}
                <Link color="purple.300" onClick={handleSignUpClick}>
                  Register
                </Link>
              </Text>
            </VStack>
          </MotionContainer>
        </Box>
      </form>
    </>
  );
}

export default LoginForm;
