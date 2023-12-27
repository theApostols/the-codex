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
import {
  CREATE_COMMENT,
  ADD_PROPS,
  ADD_DROPS,
  REMOVE_PROPS,
  REMOVE_DROPS,
} from "../utils/mutations";

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

  let currentUser; //variable to hold user's username

  //attempts to retrieve username from JWT
  try {
    //gets current user's username
    currentUser = Auth.getProfile().data.username;
  } catch (
    error //empty error block (this is just here to ensure the page still renders even if a user is not logged in)
  ) {}

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

  //retrieve user route parameter
  const { snippetId } = useParams();

  //PROPS AND DROPS MUTATIONS
  //mutation to add props, with refetch to update cache to reflect new props
  const [addProps] = useMutation(ADD_PROPS, {
    refetchQueries: [{ query: GET_INDIVIDUAL_SNIPPET }],
  });

  //mutation to add drops, with refetch to update cache to reflect new drops
  const [addDrops] = useMutation(ADD_DROPS, {
    refetchQueries: [{ query: GET_INDIVIDUAL_SNIPPET }],
  });

  //mutation to remove props, to calculate overall props when snippet is dropped
  const [removeProps] = useMutation(REMOVE_PROPS);

  //mutation to remove drops, to calculate overall props when snippet is propped
  const [removeDrops] = useMutation(REMOVE_DROPS);

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

  //props and drops handlers
  const handleAddProps = async (snippetId) => {
    if (currentUser) {
      try {
        await addProps({
          variables: {
            username: currentUser,
            snippetId: snippetId,
          },
        });
      } catch (err) {
        console.error("Error propping snippet", err);
      }
    }
  };

  const handleAddDrops = async (snippetId) => {
    if (currentUser) {
      try {
        await addDrops({
          variables: {
            username: currentUser,
            snippetId: snippetId,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleRemoveProps = async (snippetId) => {
    if (currentUser) {
      try {
        await removeProps({
          variables: {
            username: currentUser,
            snippetId: snippetId,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleRemoveDrops = async (snippetId) => {
    if (currentUser) {
      try {
        await removeDrops({
          variables: {
            username: currentUser,
            snippetId: snippetId,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

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
                  <Button
                    variant="icon"
                    size="sm"
                    onClick={() => {
                      if (snippets) {
                        handleAddDrops(snippets._id);
                      }
                    }}
                  >
                    <Icon as={FaAngleDoubleDown} w={8} h={8} ml="2" />
                  </Button>
                  <Text color="codex.highlights" fontSize="sm">
                    Props: {snippets.overallProps}
                  </Text>
                  <Button
                    variant="icon"
                    size="sm"
                    onClick={() => {
                      if (snippets) {
                        handleAddProps(snippets._id);
                      }
                    }}
                  >
                    <Icon as={FaAngleDoubleUp} w={8} h={8} />
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
                  {currentUser ? (
                    <Button
                      variant="icon"
                      size="sm"
                      onClick={toggleCommentInputVisibility}
                    >
                      Add Comment
                    </Button>
                  ) : null}
                </HStack>
              </Box>
              {/* Comment input */}
              {commentInputVisible && (
                <Box p="4">
                  <Textarea
                    color="codex.text200"
                    placeholder="Type your comment here..."
                    value={commentInput}
                    onChange={handleCommentInputChange}
                    borderColor="codex.borders"
                    focusBorderColor="codex.highlights"
                    borderWidth={2}
                  />
                  <Button
                      mt="4"
                      variant="secondary"
                      size="sm"
                    onClick={handleAddComment}
                  >
                    Submit Comment
                  </Button>
                </Box>
              )}
            </Box>
          </VStack>
        </Flex>
      </Box>
    </>
  );
}
