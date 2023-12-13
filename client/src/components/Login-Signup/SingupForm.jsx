import React from 'react';
import { Container, VStack, Heading, Input, Button, Text, Link, Box } from '@chakra-ui/react';

function SignupForm() {

  return (
      <Box w='500px' border='1px' borderColor='gray.200'>
      <VStack p='50px' spacing={4} align='stretch'>
        <Heading>Signup</Heading>
        <Input placeholder="username" />
        <Input placeholder="e-mail" type="email" />
        <Input placeholder="password" type="password" />
        <Button colorScheme="green">Signup</Button>
        <Text>
          Already have an account? 
          <Link color='teal.500' onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <Button variant='link'>Login</Button>
          </Link>
        </Text>
      </VStack>
      </Box>
  );
}

export default SignupForm;
