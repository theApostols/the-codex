import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import React from "react";
import { GET_INDIVIDUAL_SNIPPET } from "../utils/queries";
import IndividualSnippetPreview from "../components/Snippet/IndividualSnippetPreview";

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
  const snippets = data.allSnippets;
  console.log(data);

  return (
    <>
      <p style={paragraphStyle}>Hello</p>
      <p style={paragraphStyle}>UserPage is rendering</p>
      {/* {snippets.map((snippet) => (
        <IndividualSnippetPreview key={snippet._id} snippet={snippet} />
      ))} */}
    </>
  );
}
