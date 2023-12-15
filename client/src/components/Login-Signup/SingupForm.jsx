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

// import { useState } from "react";
// import { useMutation } from "@apollo/client";
// import Auth from "../../utils/auth";
// import { ADD_USER } from "../../utils/mutations";

function SignupForm() {
  // const [userFormData, setUserFormData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });
  // const [validated] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);

  // const [addUser] = useMutation(ADD_USER);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setUserFormData({ ...userFormData, [name]: value });
  // };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();

  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   try {
  //     const { data } = await addUser({
  //       variables: { ...userFormData },
  //     });

  //     const { token, user } = data.addUser;
  //     console.log(user);
  //     Auth.login(token);
  //   } catch (err) {
  //     console.error(`Signup failed. Error: ${err.message}`);
  //     setShowAlert(true);
  //   }

  //   setUserFormData({
  //     username: "",
  //     email: "",
  //     password: "",
  //   });
  // };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
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
    </>
    // <>
    //   <Box
    //     w="500px"
    //     borderWidth="1px"
    //     borderColor="gray.200"
    //     p={4}
    //     borderRadius="md"
    //   >
    //     <VStack spacing={4} align="stretch">
    //       {/* This is needed for the validation functionality above */}
    //       {/* Note: Chakra UI doesn't have a Form component like Bootstrap, so you can use a regular HTML form element */}
    //       <form noValidate onSubmit={handleFormSubmit}>
    //         {/* show alert if server response is bad */}
    //         <Alert
    //           status="error"
    //           variant="subtle"
    //           flexDirection="column"
    //           alignItems="center"
    //           justifyContent="center"
    //           textAlign="center"
    //           borderRadius="md"
    //           boxShadow="md"
    //           display={showAlert ? "flex" : "none"}
    //         >
    //           Something went wrong with your signup!
    //         </Alert>

    //         <Heading>Signup</Heading>

    //         <VStack spacing={3} align="stretch">
    //           <Input
    //             type="text"
    //             placeholder="Your username"
    //             name="username"
    //             onChange={handleInputChange}
    //             value={userFormData.username}
    //             isRequired
    //           />
    //           <Input
    //             type="email"
    //             placeholder="Your email address"
    //             name="email"
    //             onChange={handleInputChange}
    //             value={userFormData.email}
    //             isRequired
    //           />
    //           <Input
    //             type="password"
    //             placeholder="Your password"
    //             name="password"
    //             onChange={handleInputChange}
    //             value={userFormData.password}
    //             isRequired
    //           />
    //         </VStack>

    //         <Button
    //           colorScheme="green"
    //           isDisabled={
    //             !(
    //               userFormData.username &&
    //               userFormData.email &&
    //               userFormData.password
    //             )
    //           }
    //           type="submit"
    //           variant="solid"
    //           mt={4}
    //         >
    //           Sign Up
    //         </Button>

    //         <Text>
    //           Already have an account?
    //           <Link
    //             color="teal.500"
    //             onClick={handleLoginClick}
    //             cursor="pointer"
    //           >
    //             <Button variant="link">Login</Button>
    //           </Link>
    //         </Text>
    //       </form>
    //     </VStack>
    //   </Box>
    // </>
  );
}

export default SignupForm;
