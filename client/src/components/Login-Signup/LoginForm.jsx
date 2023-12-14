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
