import { useQuery, useMutation } from "@apollo/client";
import { useParams } from 'react-router-dom';
import React from "react";
import SnippetPreview from "../components/Snippet/SnippetPreview.jsx";
import { GET_USER_SNIPPETS } from "../utils/queries";
import { Box } from "@chakra-ui/react";

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
  const snippets = data.userSnippets;

  return (
    <>
      <p style={paragraphStyle}>UserPage is rendering</p>
      <Box color="codex.text">
      {snippets.map((snippet) => (
        <SnippetPreview key={snippet._id} snippet={snippet}/>
      ))}
      </Box>
    </>
  );
}
