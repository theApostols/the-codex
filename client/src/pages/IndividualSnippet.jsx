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
  useBreakpointValue,
  ColorModeContext,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GET_INDIVIDUAL_SNIPPET } from "../utils/queries";
import IndividualSnippetPreview from "../components/Snippet/IndividualSnippetPreview";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import {
  MdCode,
  MdCodeOff,
  MdOutlineAddComment,
  MdOutlineEditNote,
} from "react-icons/md";
import Auth from "../utils/auth";
import {
  CREATE_COMMENT,
  ADD_PROPS,
  ADD_DROPS,
  REMOVE_PROPS,
  REMOVE_DROPS,
  SAVE_SNIPPET,
  UNSAVE_SNIPPET,
} from "../utils/mutations";

export default function UserSnippets() {
  const paragraphStyle = {
    fontSize: "18px",
    color: "white",
    fontWeight: "bold",
  };

  const isResponsive = useBreakpointValue({ base: true, md: true, lg: false });

  // Check if the user is logged in
  const isAuthenticated = Auth.loggedIn();

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
  const [removeProps] = useMutation(REMOVE_PROPS, {
    refetchQueries: [{ query: GET_INDIVIDUAL_SNIPPET }],
  });

  //mutation to remove drops, to calculate overall props when snippet is propped
  const [removeDrops] = useMutation(REMOVE_DROPS, {
    refetchQueries: [{ query: GET_INDIVIDUAL_SNIPPET }],
  });

  //SAVE AND UNSAVE MUTATIONS/STATE
  const [isSaved, setIsSaved] = useState(false);
  const [saveSnippet] = useMutation(SAVE_SNIPPET);
  const [unsaveSnippet] = useMutation(UNSAVE_SNIPPET);

  // Use the useQuery hook to execute the GET_USER_SNIPPETS query
  const { loading, error, data } = useQuery(GET_INDIVIDUAL_SNIPPET, {
    variables: { snippetId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract snippets from the data
  const snippets = data.oneSnippet;
  const snippetUser = snippets.username;

  //props and drops handlers
  const handleAddProps = async (snippetId) => {
    if (currentUser) {
      try {
        // Check if the user has already propped/dropped the snippet
        const userHasProp = snippets.props.includes(currentUser);
        const userHasDropped = snippets.drops.includes(currentUser);

        if (userHasProp) {
          // User has already propped, so remove the prop
          await removeProps({
            variables: {
              username: currentUser,
              snippetId: snippetId,
            },
          });
        } else if (!userHasDropped) {
          // user cannot prop if they have dropped, need to undrop first
          // makes it so both buttons are not active at the same time
          // User hasn't propped, so add the prop
          await addProps({
            variables: {
              username: currentUser,
              snippetId: snippetId,
            },
          });
        }
      } catch (err) {
        console.error("Error propping snippet", err);
      }
    }
  };

  const handleAddDrops = async (snippetId) => {
    if (currentUser) {
      try {
        const userHasDropped = snippets.drops.includes(currentUser);
        const userHasProp = snippets.props.includes(currentUser);

        if (userHasDropped) {
          // User has already dropped, so remove the drop
          await removeDrops({
            variables: {
              username: currentUser,
              snippetId: snippetId,
            },
          });
        } else if (!userHasProp) {
          // user cannot drop if they have propped, need to unprop first
          // makes it so both buttons are not active at the same time
          // User hasn't dropped, so add the drop
          await addDrops({
            variables: {
              username: currentUser,
              snippetId: snippetId,
            },
          });
        }
      } catch (err) {
        console.error("Error dropping snippet:", err);
      }
    }
  };

  //save and unsave handlers
  const handleSaveSnippet = async (snippetId) => {
    if (currentUser) {
      try {
        await saveSnippet({
          variables: {
            username: currentUser,
            snippetId: snippetId,
          },
        });
        setIsSaved(true);
      } catch (err) {
        console.error("Error saving snippet:", err);
      }
    }
  };

  const handleUnsaveSnippet = async (snippetId) => {
    if (currentUser) {
      try {
        await unsaveSnippet({
          variables: {
            username: currentUser,
            snippetId: snippetId,
          },
        });
        setIsSaved(false);
      } catch (err) {
        console.error("Error unsaving snippet:", err);
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
                    color={
                      snippets.drops.includes(currentUser)
                        ? "codex.highlights"
                        : "codex.borders"
                    }
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
                    color={
                      snippets.props.includes(currentUser)
                        ? "codex.highlights"
                        : "codex.borders"
                    }
                  >
                    <Icon as={FaAngleDoubleUp} w={8} h={8} />
                  </Button>

                  {/* Conditionally render the edit button */}
                  {currentUser && snippetUser === currentUser && (
                    <Link to={`/edit-snippet/${snippets._id}`}>
                      <Button variant="icon" size="sm">
                        <Icon
                          as={MdOutlineEditNote}
                          w={8}
                          h={8}
                          mr={isResponsive ? "0" : "2"}
                        />
                        {isResponsive ? "" : "Edit"}
                      </Button>
                    </Link>
                  )}
                  {currentUser ? (
                    <Button
                      variant="icon"
                      size="sm"
                      onClick={toggleCommentInputVisibility}
                    >
                      <Icon
                        as={MdOutlineAddComment}
                        w={6}
                        h={6}
                        mr={isResponsive ? "0" : "2"}
                      />
                      {isResponsive ? "" : "Add Comment"}
                    </Button>
                  ) : null}
                  {isAuthenticated && (
                    <>
                      <Button
                        variant="icon"
                        size="sm"
                        onClick={() => handleSaveSnippet(snippets._id)}
                      >
                        <Icon
                          as={MdCode}
                          w={8}
                          h={8}
                          mr={isResponsive ? "0" : "2"}
                        />
                        {isResponsive ? "" : "Save Snippet"}
                      </Button>
                      <Button
                        variant="icon"
                        size="sm"
                        onClick={() => handleUnsaveSnippet(snippets._id)}
                      >
                        <Icon
                          as={MdCodeOff}
                          w={8}
                          h={8}
                          mr={isResponsive ? "0" : "2"}
                        />
                        {isResponsive ? "" : "Unsave Snippet"}
                      </Button>
                    </>
                  )}
                </HStack>
              </Box>
              {/* Conditionally render resource links */}
              {snippets.resources && snippets.resources.length > 0 && (
                <VStack p="4" align="start">
                  <Heading fontSize="m">Resources</Heading>
                  {snippets.resources.map((resource, index) => (
                    <Text
                      key={index}
                      color="codex.text"
                      fontSize="sm"
                      _hover={{ textDecoration: "underline" }}
                    >
                      <Link
                        to={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {resource.title || resource.link}
                      </Link>
                    </Text>
                  ))}
                </VStack>
              )}

              {/* Conditionally render tags */}
              {snippets.tags && snippets.tags.length > 0 && (
                <VStack pl="4" pb="4" pr="4" align="start">
                  <Heading fontSize="m">Tags</Heading>
                  <HStack>
                    {snippets.tags.map((tag, index) => (
                      <Text key={index} color="codex.text" fontSize="sm">
                        {tag}
                      </Text>
                    ))}
                  </HStack>
                </VStack>
              )}

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
