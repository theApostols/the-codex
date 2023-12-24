import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from 'react-router-dom';
import React from "react";
import MainSnippetPreview from "../components/Snippet/MainSnippetPreview.jsx";
import { GET_USER_SNIPPETS } from "../utils/queries";
import { Box, Flex, VStack, HStack, Button, Icon, Text, Avatar, Heading } from "@chakra-ui/react";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

export default function UserSnippets() {
  const paragraphStyle = {
    fontSize: "18px",
    color: "white",
    fontWeight: "bold",
  };

  //retrieve user route parameter
  const {username} = useParams();

  // Use the useQuery hook to execute the GET_USER_SNIPPETS query
  const { loading, error, data } = useQuery(GET_USER_SNIPPETS,
  {
    variables: {username}
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract snippets from the data
  const snippets = data.userSnippets.snippets;

  console.log(snippets);

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
        <VStack
          spacing="4"
          w="full"
          maxW="5xl"
          mx="auto"
          p="8"
          color="codex.accents"
        >
          <HStack spacing = {4}>
            <Avatar
              size="2xl"
              src={`/images/file-uploads/${data?.userSnippets?.user?.image}`}
            />
            <Heading color="codex.accents" size = "3xl">{username}</Heading>
          </HStack>
          <Box
            w="full"
            border="1px solid"
            borderColor="codex.borders"
            borderRadius="lg"
            bg="codex.darkest"
          >
            {snippets.map((snippet, index) => (
              <Box
                key={index}
                pb="5"
                w="full"
                borderBottom="1px solid"
                borderColor="codex.borders"
              >
                <Link to={`/individual-snippets/${snippet._id}`}>
                  <MainSnippetPreview snippet={snippet} />
                </Link>
                <HStack color="codex.text">
                  <Button variant="icon" size="sm">
                    <Icon as={FaAngleDoubleDown} w={8} h={8} mr="2" />
                  </Button>
                  <Text color="codex.highlights" fontSize="sm">
                    Props: {snippet.overallProps}
                  </Text>
                  <Button variant="icon" size="sm">
                    <Icon as={FaAngleDoubleUp} w={8} h={8} mr="2" />
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
