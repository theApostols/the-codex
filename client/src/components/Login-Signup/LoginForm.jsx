import React from "react";
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    // Navigate to the sign-up page
    navigate("/signup");
  };

  return (
    <VStack p="50px" spacing={4} align="stretch">
      <Heading>Login</Heading>
      <Input placeholder="username" />
      <Input placeholder="password" type="password" />
      <Button colorScheme="blue">Login</Button>
      <Text>
        Don't have an account?
        <Link
          color="teal.500"
          onClick={handleSignUpClick}
          style={{ cursor: "pointer" }}
        >
          <Button variant="link">Signup</Button>
        </Link>
      </Text>
    </VStack>
  );
}

export default LoginForm;
