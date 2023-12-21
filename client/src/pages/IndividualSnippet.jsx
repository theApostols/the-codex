import { useQuery, useMutation } from "@apollo/client";
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
import { GET_INDIVIDUAL_SNIPPET } from "../utils/queries";
import IndividualSnippetPreview from "../components/Snippet/IndividualSnippetPreview";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

export default function UserSnippets() {
  const paragraphStyle = {
    fontSize: "18px",
    color: "white",
    fontWeight: "bold",
  };

  //retrieve user route parameter
  const { snippetId } = useParams();

  // Use the useQuery hook to execute the GET_USER_SNIPPETS query
  const { loading, error, data } = useQuery(GET_INDIVIDUAL_SNIPPET, {
    variables: { snippetId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract snippets from the data
  const snippets = data.oneSnippet;
  console.log("This is the snippets", snippets);

  return (
    <>
      <Box
        p="50"
        d="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          w="full"
          maxW="5xl"
          mx="auto"
          p="8"
          alignItems="start"
        >
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
              <Box
                pb="5"
                w="full"
                borderBottom="1px solid"
                borderColor="codex.borders"
              >
                <Link to={`/snippet/${snippets._id}`}>
                  <IndividualSnippetPreview snippet={snippets} />
                </Link>
                <HStack color="codex.text">
                  <Button variant="icon" size="sm">
                    <Icon as={FaAngleDoubleDown} w={8} h={8} mr="2" />
                  </Button>
                  <Text color="codex.highlights" fontSize="sm">
                    Props:
                  </Text>
                  <Button variant="icon" size="sm">
                    <Icon as={FaAngleDoubleUp} w={8} h={8} mr="2" />
                  </Button>
                </HStack>
              </Box>
            </Box>
          </VStack>
        </Flex>
      </Box>
    </>
  );
}
