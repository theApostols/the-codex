import React, { useState, useEffect } from "react";
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
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { CREATE_USER } from "../../utils/mutations";

const MotionContainer = motion(Container);

function SignupForm() {
  const {
    isOpen: isOpenError,
    onOpen: onOpenError,
    onClose: onCloseError,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const termsAndConditions = `
    Welcome to The Codex! By creating an account and using our services, you are agreeing to be bound by the following terms and conditions. Please review them carefully.

    1. Acceptance of Terms
    By accessing or using The Codex, you confirm your agreement to these terms. If you do not agree to any part of these terms, please do not use The Codex.
    
    2. Registration
    To access certain features of The Codex, you must register and create an account. You agree to provide accurate, complete, and up-to-date information and to maintain and update this information as required.
    
    3. Privacy Policy
    Your privacy is important to us. Our Privacy Policy details how we handle your personal information. By using The Codex, you consent to the collection and use of this information according to our privacy policy.
    
    4. User Conduct
    You are solely responsible for all content you post, share, or otherwise make available on The Codex. You agree not to upload, post, or otherwise disseminate any content that is unlawful, harassing, libelous, invasive of another's privacy, harmful, or otherwise objectionable.
    
    5. Intellectual Property
    All content on The Codex, including text, graphics, logos, and software, is the property of The Codex or its content suppliers and protected by Canadian and international intellectual property laws. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of The Codex without express written permission from us.
    
    6. Third-Party Links
    The Codex may contain links to third-party websites or services that are not owned or controlled by The Codex. We assume no responsibility for the content, policies, or practices of any third-party websites or services.
    
    7. Disclaimers
    The Codex is provided "as is" and "as available" without any warranty of any kind. We disclaim all warranties, express or implied, including but not limited to the accuracy, reliability, and completeness of the content on The Codex.
    
    8. Limitation of Liability
    In no event shall The Codex, its affiliates, or its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of The Codex.
    
    9. Changes to Terms
    We reserve the right, at our sole discretion, to modify or replace these terms at any time. We will provide notice of any significant changes by posting a notice on The Codex.
    
    10. Governing Law
    These terms shall be governed by and construed in accordance with the laws of Ontario, Canada, without regard to its conflict of law provisions.
    
    11. Contact Us
    If you have any questions about these Terms, please contact us at theapostolsofveronica@outlook.com.

    By creating an account and using The Codex, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
  `;

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [createUser, { error, data }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const handleAgreeChange = (event) => setAgreeToTerms(event.target.checked);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  //function to handle displaying an error modal
  const handleErrorMessage = async (error) => {
    let errorDetails; //variable to hold detailed error message

    //provides additional error details for specific errors
    if (
      error.message === "ValidationError: email: The provided email is invalid"
    ) {
      errorDetails = "Provided email is invalid. Please try again.";
    } else if (
      error.message.match(
        /MongoServerError: E11000 duplicate key error collection: codexDB.users index: username_1 dup key: \{ username: ".*" \}/
      )
    ) {
      errorDetails = "Provided username is already in use. Please try again.";
    } else if (
      error.message.match(
        /MongoServerError: E11000 duplicate key error collection: codexDB.users index: email_1 dup key: \{ email: ".*" \}/
      )
    ) {
      errorDetails = "Provided email is already in use. Please try again.";
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
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      const { token, user } = data.createUser;
      Auth.login(token);
    } catch (err) {
      console.error(`Signup failed. Error: ${err.message}`);
      handleErrorMessage(err);
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

  const handleTermsClick = (event) => {
    event.preventDefault();
    onOpen();
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

              <Checkbox
                colorScheme="purple"
                isChecked={agreeToTerms}
                onChange={handleAgreeChange}
              >
                I agree to the{" "}
                <Link color="purple.300" onClick={handleTermsClick}>
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

          {/* Error message modal */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="codex.text200" color="codex.darkest">
              <ModalHeader>Terms and Conditions</ModalHeader>
              <ModalBody>
                {/* Inserting the terms and conditions text */}
                <Text whiteSpace="pre-wrap">{termsAndConditions}</Text>
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
