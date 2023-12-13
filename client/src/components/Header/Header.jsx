import React from 'react';
import { Box, Flex, Text, Button, Link, Image, Spacer } from '@chakra-ui/react';

function Header() {
  return (
    <Box bg="blue.100" w="100vh" p='50px' color="blue.700">
      <Flex align="center">
        <Image src="./assets/react.svg" alt="LOGO" boxSize="50px" />
        <Text fontSize="xl" fontWeight="bold" ml={2}>
          The Codex
        </Text>
        <Spacer />
        <Box as="nav">
          <Link href="#!" p={2}>Button 1</Link>
          <Link href="#!" p={2}>Button 2</Link>
          <Link href="#!" p={2}>Button 3</Link>
          <Link href="#!" p={2}>Button 4</Link>
        </Box>
        <Spacer />
        <Button colorScheme="blue" variant="ghost" mr={4}>
          Log In
        </Button>
        <Button colorScheme="blue" variant="solid">
          Sign Up
        </Button>
      </Flex>
    </Box>
  );
}

export default Header;
