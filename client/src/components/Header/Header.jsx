import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  Image,
  Spacer,
  Container,
} from "@chakra-ui/react";

function Header() {
  return (
    <Box
      bg="blue.100"
      // w="100vh" //commented this out to make header cover full width of page
      p="50px"
      color="blue.700"
    >
      <Container maxW="container.xl">
        <Flex align="center">
          {/* this was the only way i could get the logo to show up, adjust as needed */}
          <Image
            src="../../public/images/THE-CODEX.png"
            alt="LOGO"
            boxSize="100px"
          />
          <Text fontSize="xl" fontWeight="bold" ml={2}>
            The Codex
          </Text>
          <Spacer />
          <Box as="nav">
            <Link href="#!" p={2}>
              Button 1
            </Link>
            <Link href="#!" p={2}>
              Button 2
            </Link>
            <Link href="#!" p={2}>
              Button 3
            </Link>
            <Link href="#!" p={2}>
              Button 4
            </Link>
          </Box>
          <Spacer />
          <Button colorScheme="blue" variant="ghost" mr={4}>
            Log In
          </Button>
          <Button colorScheme="blue" variant="solid">
            Sign Up
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;
