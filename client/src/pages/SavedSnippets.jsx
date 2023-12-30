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
    <Box p="4" color="codex.text" bg="codex.darkest" mb="4">
      <Flex direction="column" align="center">
        <Box
          w="full"
          maxW="5xl"
          p="4"
          borderRadius="lg"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        >
          <Heading as="h1" size="lg" mb="4" color="codex.accents">
            Saved Snippets
          </Heading>
          <Divider mb="4" borderColor="codex.borders" />
          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap="4"
          >
            {savedSnippets.map((snippet) => (
              <MainSnippetPreview key={snippet._id} snippet={snippet} />
            ))}
          </Grid>
        </Box>
      </Flex>
    </Box>
  );
}