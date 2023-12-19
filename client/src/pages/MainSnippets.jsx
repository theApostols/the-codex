import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import React from "react";
import { GET_ALL_SNIPPETS } from "../utils/queries";
import MainSnippetPreview from "../components/Snippet/MainSnippetPreview.jsx";

export default function UserSnippets() {
  const paragraphStyle = {
    fontSize: "18px",
    color: "white",
    fontWeight: "bold",
  };

  //retrieve user route parameter
  // const { username } = useParams();

  // Use the useQuery hook to execute the GET_USER_SNIPPETS query
  const { loading, error, data } = useQuery(GET_ALL_SNIPPETS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract snippets from the data
  const snippets = data.allSnippets;
  // console.log(snippets);

  return (
    <>
      <p style={paragraphStyle}>Hello</p>
      <p style={paragraphStyle}>UserPage is rendering</p>
      {snippets.map((snippet) => (
        <MainSnippetPreview key={snippet._id} snippet={snippet} />
      ))}
    </>
  );
}
