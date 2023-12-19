import React, { useState } from "react";
import {
  Box, VStack, FormControl, FormLabel, Input, Button, Text, Link,
  Heading, Checkbox, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, useDisclosure, Container,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { CREATE_USER } from "../../utils/mutations";

const MotionContainer = motion(Container);

function SignupForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const [createUser, { error, data }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const handleAgreeChange = (event) => setAgreeToTerms(event.target.checked);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      const { token, user } = data.createUser;
      Auth.login(token);
    } catch (err) {
      console.error(`Signup failed. Error: ${err.message}`);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleLoginClick = () => {
    navigate("/login");
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
              <Heading fontSize="2xl">Register</Heading>

              <FormControl id="username" isRequired>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  autoComplete="username"
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  value={userFormData.username}
                />
              </FormControl>

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

              <Checkbox isChecked={agreeToTerms} onChange={handleAgreeChange}>
                I agree to the{" "}
                <Link color="purple.300" onClick={onOpen}>
                  Terms and Conditions
                </Link>
              </Checkbox>

              <Button
                type="submit"
                w="full"
                colorScheme="purple"
                mt="4"
                isDisabled={!agreeToTerms}
              >
                Register
              </Button>

              <Text mt="6">
                Already have an account?{" "}
                <Link color="purple.300" onClick={handleLoginClick}>
                  Login
                </Link>
              </Text>
            </VStack>
          </MotionContainer>

          {/* Terms and Conditions Modal */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="codex.accents" color="codex.darkest">
              <ModalHeader>Terms and Conditions</ModalHeader>
              <ModalBody>
                {/* Terms and conditions text goes here */}
                <Text>
                  Here are the terms and conditions for using our service...
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </form>
    </>
  );
}

export default SignupForm;
