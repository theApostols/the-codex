import React from "react";
import {
  Container,
  VStack,
  Heading,
  Input,
  Button,
  Text,
  Link,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// import { useMutation } from '@apollo/client';
// import Auth from '../utils/auth';
// import { ADD_USER } from '../utils/mutations';

function SignupForm() {
  // const [formState, setFormState] = useState({ email: "", password: "" });
  // const [addUser] = useMutation(ADD_USER);

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   const mutationResponse = await addUser({
  //     variables: {
  //       email: formState.email,
  //       password: formState.password,
  //       firstName: formState.firstName,
  //       lastName: formState.lastName,
  //     },
  //   });
  //   const token = mutationResponse.data.addUser.token;
  //   Auth.login(token);
  // };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Box w="500px" border="1px" borderColor="gray.200">
      <VStack p="50px" spacing={4} align="stretch">
        <Heading>Signup</Heading>
        <Input placeholder="username" />
        <Input placeholder="e-mail" type="email" />
        <Input placeholder="password" type="password" />
        <Button colorScheme="green">Signup</Button>
        <Text>
          Already have an account?
          <Link
            color="teal.500"
            onClick={handleLoginClick}
            style={{ cursor: "pointer" }}
          >
            <Button variant="link">Login</Button>
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}

export default SignupForm;
