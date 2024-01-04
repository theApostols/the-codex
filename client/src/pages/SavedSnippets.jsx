import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { Box, VStack, Heading, Flex, Divider } from "@chakra-ui/react";
import { GET_SAVED_SNIPPETS } from "../utils/queries";
import MainSnippetPreview from "../components/Snippet/MainSnippetPreview";

export default function SavedSnippets() {
  const { username } = useParams();

  const { data, loading, error, refetch } = useQuery(GET_SAVED_SNIPPETS, {
    variables: { username },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error!: {error.message}</div>;
  }

  const savedSnippets = data?.userSavedSnippets.savedSnippets || [];

  return (
    <Box
      p="5"
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
        alignItems="start"
      >
        <VStack
          spacing="4"
          w="full"
          maxW="5xl"
          mx="auto"
          color="codex.accents"
        >
          <Heading color="codex.text" as="h1" m="4" textAlign="center">
            Saved Snippets
          </Heading>

          <Box
            w="full"
            border="1px solid"
            borderColor="codex.borders"
            borderRadius="lg"
            bg="codex.darkest"
          >
            <Divider mb="4" borderColor="codex.borders" />

            {savedSnippets.map((snippet) => (
              <Box
                key={snippet._id}
                pb="5"
                w="full"
                borderBottom="1px solid"
                borderColor="codex.borders"
              >
                <MainSnippetPreview key={snippet._id} snippet={snippet} />
              </Box>
            ))}
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
}
