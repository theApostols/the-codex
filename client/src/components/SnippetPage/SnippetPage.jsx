import React from "react";
import { useQuery } from "@apollo/client";
import { VStack, Text, Spinner } from "@chakra-ui/react";
import Snippet from "../components/Snippet";
import { GET_SNIPPETS } from "../utils/queries";

const SnippetPage = () => {
  const { loading, error, data } = useQuery(GET_SNIPPETS);
  if (loading) return <Spinner />;
  if (error) return <Text>Error loading snippets</Text>;

  const snippets = data.snippets;
  return (
    <VStack align="stretch" spacing={4} p={4}>
      {snippets.map((snippet) => (
        <Snippet key={snippet._id} snippet={snippet} />
      ))}
    </VStack>
  );
};

export default SnippetPage;
