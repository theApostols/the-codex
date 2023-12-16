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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

function LoginForm() {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  //Page crashes when I add the LOGIN_USER mutation. The rest of the logic seems to be correct.
  const [loginUser, {error, data}] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await loginUser({
        variables: { ...userFormData },
      });

      const { token, user } = await data.loginUser;
      console.log(user);
      Auth.loginUser(token);
    } catch (err) {
      console.error(`Login failed. Error: ${err.message}`);
      setShowAlert(true);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  const navigate = useNavigate();

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
          bgSize="cover"
          minH="50vh"
          py="12"
          px={{ base: "4", lg: "8" }}
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
            <FormControl
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
              id="email"
              isRequired
            >
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input autoComplete="email" type="email" />
            </FormControl>
            <FormControl
              name="password"
              onChange={handleInputChange}
              value={userFormData.password}
              id="password"
              isRequired
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input autoComplete="password" type="password" />
            </FormControl>
            <Checkbox colorScheme="purple">Remember me</Checkbox>
            <Button w="full" colorScheme="purple" mt="4">
              Login
            </Button>
            <Text mt="6">
              Don't have an account?{" "}
              <Link color="purple.300" onClick={handleSignUpClick}>
                Register
              </Link>
            </Text>
          </VStack>
        </Box>
      </form>
    </>
  );
}

export default LoginForm;
