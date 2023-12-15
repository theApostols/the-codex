import React from "react";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  Heading,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// import { useState } from "react";
// import { useMutation } from "@apollo/client";
// import Auth from "../../utils/auth";
// import { ADD_USER } from "../../utils/mutations";

function SignupForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [agreeToTerms, setAgreeToTerms] = React.useState(false);
  const handleAgreeChange = (event) => setAgreeToTerms(event.target.checked);
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
        maxW="md" // Establece el ancho al máximo disponible
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
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" />
        </FormControl>

        {/* Terms and Conditions Checkbox and Modal */}
        <FormControl>
          <Checkbox isChecked={agreeToTerms} onChange={handleAgreeChange}>
            I agree to the{" "}
            <Link color="purple.300" onClick={onOpen}>
              Terms and Conditions
            </Link>
          </Checkbox>
        </FormControl>

        <Button w="full" colorScheme="purple" mt="4" isDisabled={!agreeToTerms}>
          Register
        </Button>
        <Text mt="6">
          Already have an account?{" "}
          <Link color="purple.300" onClick={handleLoginClick}>
            Login
          </Link>
        </Text>
      </VStack>

      {/* Terms and Conditions Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg='codex.accents' color='codex.darkest'>
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
  );
}

export default SignupForm;
