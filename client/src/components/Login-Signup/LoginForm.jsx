import React from 'react';
import { Box, VStack, Heading, Input, Button, Text, Link } from '@chakra-ui/react';

function LoginForm() {
  return (
      <VStack p='50px' spacing={4} align='stretch'>
        <Heading>Login</Heading>
        <Input placeholder="username" />
        <Input placeholder="password" type="password" />
        <Button colorScheme="blue">Login</Button>
        <Text>
          Don't have an account? 
          <Link color='teal.500' onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>
            <Button variant='link'>Signup</Button>
          </Link>
        </Text>
      </VStack>
  );
}

export default LoginForm;
