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
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GET_INDIVIDUAL_SNIPPET } from "../utils/queries";
import IndividualSnippetPreview from "../components/Snippet/IndividualSnippetPreview";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import Auth from "../utils/auth";
import { CREATE_COMMENT } from "../utils/mutations";

export default function UserSnippets() {
  const paragraphStyle = {
    fontSize: "18px",
    color: "white",
    fontWeight: "bold",
  };

  // State for comment input
  const [commentInput, setCommentInput] = useState("");
  const [commentInputVisible, setCommentInputVisible] = useState(false);
  const [createComment] = useMutation(CREATE_COMMENT);

  // Event handler for comment input change
  const handleCommentInputChange = (e) => {
    setCommentInput(e.target.value);
  };

  // Event handler for toggling comment input visibility
  const toggleCommentInputVisibility = () => {
    setCommentInputVisible(!commentInputVisible);
  };

  const handleAddComment = async () => {
    try {
      // Execute the mutation
      const result = await createComment({
        variables: {
          parentSnippetId: snippetId,
          username: currentUser,
          commentText: commentInput,
        },
        // Update the cache after the mutation is successful
        update: (cache, { data }) => {
          // Read the existing data from the cache
          const existingData = cache.readQuery({
            query: GET_INDIVIDUAL_SNIPPET,
            variables: { snippetId },
          });

          // Add the new comment to the existing data
          const newComment = data.createComment;

          cache.writeQuery({
            query: GET_INDIVIDUAL_SNIPPET,
            variables: { snippetId },
            data: {
              oneSnippet: {
                ...existingData.oneSnippet,
                comments: [...existingData.oneSnippet.comments, newComment],
              },
            },
          });
        },
      });

      // Handle the result if needed
      console.log("Comment created:", result);

      // Clear the comment input and hide the input box
      setCommentInput("");
      setCommentInputVisible(false);
    } catch (error) {
      console.error("Error creating comment:", error);
      // Handle error if needed
    }
  };

  const currentUser = Auth.getProfile().data.username;

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
  const snippetUser = snippets.username;
  // console.log("This is the snippets", snippets);
  console.log(snippetUser);
  console.log(currentUser);

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
                <Link>
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
                  {/* Conditionally render the edit button */}
                  {currentUser && snippetUser === currentUser && (
                    <Link to={`/edit-snippet/${snippets._id}`}>
                      <Button variant="icon" size="sm">
                        {/* PLEASE EDIT THIS TO LOOK BETTER =D I SUCK AT THIS */}
                        Edit
                      </Button>
                    </Link>
                  )}
                  {/* Button to toggle comment input */}
                  <Button
                    variant="icon"
                    size="sm"
                    onClick={toggleCommentInputVisibility}
                  >
                    Add Comment
                  </Button>
                </HStack>
              </Box>
              {/* Comment input */}
              {commentInputVisible && (
                <Box>
                  <Textarea
                    placeholder="Type your comment here..."
                    value={commentInput}
                    onChange={handleCommentInputChange}
                  />
                  <Button onClick={handleAddComment}>Submit Comment</Button>
                </Box>
              )}
            </Box>
          </VStack>
        </Flex>
      </Box>
    </>
  );
}
