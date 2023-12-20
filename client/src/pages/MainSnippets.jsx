import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  VStack,
  Text,
  Button,
  Icon,
  HStack,
  Heading,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { GET_ALL_SNIPPETS } from "../utils/queries";
import MainSnippetPreview from "../components/Snippet/MainSnippetPreview.jsx";
import { BiBookmarkAltMinus, BiBookmarkAltPlus } from "react-icons/bi";

export default function UserSnippets() {
  // Retrieve user route parameter
   const { username } = useParams();

  // Use the useQuery hook to execute the GET_ALL_SNIPPETS query
  const { loading, error, data } = useQuery(GET_ALL_SNIPPETS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract snippets from the data
  const snippets = data.allSnippets;
  // console.log(snippets);

  return (
    <>
      <Box p="50" d="flex" alignItems="center" justifyContent="center" color="white">
      <Flex direction={{ base: "column", md: "row" }} w="full" maxW="5xl" mx="auto" p="8" alignItems="start">
        {/* Profile Section on the Left */}
        {/* <VStack spacing="4" align="center" mr={{ md: "8" }}>
          <Avatar src="/path-to-avatar-image.jpg" size="xl" />
          <Heading as="h3">Username</Heading>
        </VStack> */}
        <VStack
          spacing="4"
          w="full"
          maxW="5xl"
          mx="auto"
          p="8"
          color="codex.accents"
        >
          <Box
            w="full"
            border="1px solid"
            borderColor="codex.borders" 
            borderRadius="lg"
            bg="codex.darkest"
          >
            {snippets.map((snippet) => (
              <Box
                key={snippet._id}
                pb="5"
                w="full"
                borderBottom="1px solid"
                borderColor="codex.borders"
              >
                <Link to={`/snippet/${snippet._id}`}>
                  <MainSnippetPreview snippet={snippet} />
                </Link>
                <HStack color="codex.text">
                  <Button variant="icon" size="sm">
                    <Icon as={BiBookmarkAltMinus} w={8} h={8} mr="2" />
                  </Button>
                  <Text color="codex.highlights" fontSize="sm">
                    Props:
                  </Text>
                  <Button variant="icon" size="sm">
                    <Icon as={BiBookmarkAltPlus} w={8} h={8} mr="2" />
                  </Button>
                </HStack>
              </Box>
            ))}
          </Box>
        </VStack>
        </Flex>
      </Box>
    </>
  );
}
