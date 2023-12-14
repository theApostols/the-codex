import React from 'react';
import { Box, Button, Text, VStack, Heading, SimpleGrid, Image } from '@chakra-ui/react';

function Home() {
  return (
    <Box textAlign="center" fontSize="xl">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" my={6}>
          Cool Title of our app
        </Heading>
        <Text>Cool Description of our app</Text>
        <Button>
          Cool button
        </Button>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mt={8}>
          <Image boxSize="550px" src="/images/home/code01.png" alt="Graphic 1" />
          <Image boxSize="550px" src="/images/home/code02.png" alt="Graphic 2" />
          <Image boxSize="550px" src="/images/home/code03.png" alt="Graphic 3" />
        </SimpleGrid>
      </VStack>
    </Box>
  );
}

export default Home;