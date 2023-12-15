import React from "react";
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
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

// import { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { LOGIN } from "../../utils/mutations";
// import Auth from "../../utils/auth";

function LoginForm() {
  // const [formState, setFormState] = useState({ email: "", password: "" });
  // const [login, { error }] = useMutation(LOGIN);

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const mutationResponse = await login({
  //       variables: { email: formState.email, password: formState.password },
  //     });
  //     const token = mutationResponse.data.login.token;
  //     Auth.login(token);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // };

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    // Navigate to the sign-up page
    navigate("/signup");
  };

  return (
    <Box
      bgImage="url('/images/home/login.png')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      minH="50vh"
      py="12"
      px={{ base: '4', lg: '8' }}
      d="flex"
      alignItems="center"
      justifyContent="center"
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
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Checkbox colorScheme="purple">Remember me</Checkbox>
        <Button w="full" colorScheme="purple" mt="4">Login</Button>
        <Text mt="6">
          Don't have an account? <Link color="purple.300" onClick={handleSignUpClick}>Register</Link>
        </Text>
      </VStack>
    </Box>
  );
}

export default LoginForm;
