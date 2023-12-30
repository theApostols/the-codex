import React from "react";
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
  Grid,
  Flex,
  Checkbox,
  Divider,
} from "@chakra-ui/react";
import { GET_SAVED_SNIPPETS } from "../utils/queries";
import MainSnippetPreview from "../components/Snippet/MainSnippetPreview";

export default function SavedSnippets() {
  const { username } = useParams();

  const { data, loading, error } = useQuery(GET_SAVED_SNIPPETS, {
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
          <Box
            w="full"
            border="1px solid"
            borderColor="codex.borders"
            borderRadius="lg"
            bg="codex.darkest"
          >
            <Heading as="h1" size="lg" m="4" textAlign="center">
              Saved Snippets
            </Heading>
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
