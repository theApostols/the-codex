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
import React, { useState, useEffect } from "react";
import { GET_ALL_SNIPPETS } from "../utils/queries";
import MainSnippetPreview from "../components/Snippet/MainSnippetPreview.jsx";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import {
  ADD_PROPS,
  ADD_DROPS,
  REMOVE_PROPS,
  REMOVE_DROPS,
} from "../utils/mutations";
import Auth from "../utils/auth";

export default function UserSnippets() {
  // set state for Tags
  const [showTagsSection, setShowTagsSection] = useState(false);
  // const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  // sample tags
  const availableTags = [
    "3D Printing",
    "AI Markup Language (AIML)",
    "Assembly",
    "Augmented Reality (AR)",
    "Blockchain",
    "Cloud Computing",
    "Concurrent",
    "Configuration Management",
    "Containerization and Orchestration",
    "Data Science",
    "Database Query",
    "Desktop App",
    "Distributed Systems",
    "Domain-Specific Language (DSL)",
    "Educational",
    "Embedded Systems",
    "Framework",
    "Functional Programming",
    "Game Dev",
    "Graph Query",
    "Hardware Description Language (HDL)",
    "IoT Programming",
    "Logic",
    "Machine Learning",
    "Markup",
    "Mobile App Dev",
    "Networking",
    "Parallel",
    "Robotics",
    "Scientific Computing",
    "Scripting",
    "Serverless Computing",
    "Virtual Reality (VR)",
    "Web API",
    "Web Dev",
    "Web Security",
  ];

  // PROPS AND DROPS MUTATIONS
  // mutation to add props, with refetch to update cache to reflect new props
  const [addProps] = useMutation(ADD_PROPS, {
    refetchQueries: [{ query: GET_ALL_SNIPPETS }],
  });

  //mutation to add drops, with refetch to update cache to reflect new drops
  const [addDrops] = useMutation(ADD_DROPS, {
    refetchQueries: [{ query: GET_ALL_SNIPPETS }],
  });

  //mutation to remove props, to calculate overall props when snippet is dropped
  const [removeProps] = useMutation(REMOVE_PROPS, {
    refetchQueries: [{ query: GET_ALL_SNIPPETS }],
  });

  //mutation to remove drops, to calculate overall props when snippet is propped
  const [removeDrops] = useMutation(REMOVE_DROPS, {
    refetchQueries: [{ query: GET_ALL_SNIPPETS }],
  });

  //QUERY TO GET ALL SNIPPETS
  const { loading, error, data, refetch } = useQuery(GET_ALL_SNIPPETS);

  //refetch all snippets using updated tags upon state change
  useEffect(() => {
    if (loading) return; //eject from function if the page is still loading

    refetch({ tags: selectedTags });
  }, [selectedTags, refetch, loading]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const snippets = data?.allSnippets;

  let currentUser; //variable to hold user's username

  //attempts to retrieve username from JWT
  try {
    //gets current user's username
    currentUser = Auth.getProfile()?.data?.username;
  } catch (
    error //empty error block (this is just here to ensure the page still renders even if a user is not logged in)
  ) {}

  //PROPS AND DROPS HANDLERS
  //PROP A SNIPPET
  const handleAddProps = async (snippetId) => {
    if (currentUser) {
      try {
        // find snippet by id in snippets array
        const snippet = snippets.find((snippet) => snippet._id === snippetId);

        if (!snippet) {
          console.error("Snippet not found");
          return;
        }
        // Check if the user has already propped/dropped the snippet
        const userHasProp = snippet.props.includes(currentUser);
        const userHasDropped = snippet.drops.includes(currentUser);

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

  //DROP A SNIPPET
  const handleAddDrops = async (snippetId) => {
    if (currentUser) {
      try {
        const snippet = snippets.find((snippet) => snippet._id === snippetId);

        if (!snippet) {
          console.error("Snippet not found");
          return;
        }
        // Check if the user has already propped/dropped the snippet
        const userHasProp = snippet.props.includes(currentUser);
        const userHasDropped = snippet.drops.includes(currentUser);
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

  const handleToggleTags = () => {
    setShowTagsSection(!showTagsSection);
  };

  const handleTagChange = async (tag) => {
    const isTagSelected = selectedTags.includes(tag);

    if (isTagSelected) {
      // Tag is already selected, remove it
      setSelectedTags((prevSelectedTags) =>
        prevSelectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      // Tag is not selected, add it
      setSelectedTags((prevSelectedTags) => [...prevSelectedTags, tag]);
    }
  };

  return (
    <>
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
            color="codex.accents"
          >
            {/* Welcome message for logged-in users */}
            {currentUser ? (
              <Text
                fontSize="x-large"
                fontWeight="bold"
                color="codex.highlights"
                pb="10"
                textAlign="center"
              >
                Welcome, {currentUser}!
                <br /> Enjoy browsing The Codex.
              </Text>
            ) : (
              <Text
                fontSize="x-large"
                fontWeight="bold"
                color="codex.highlights"
                pb="10"
                textAlign="center"
              >
                Welcome to The Codex!
                <br /> Please <Link to="/login">Login</Link> or {}
                <Link to="/signup">Signup</Link> for exclusive features.
              </Text>
            )}
            {/* Toggle Tags Section */}
            <Box w="full">
              <Button
                variant="secondary"
                onClick={handleToggleTags}
                size="sm"
                mb="4"
              >
                {showTagsSection ? "Hide Tags" : "Filter Tags"}
              </Button>
              {showTagsSection && (
                <Box
                  w="full"
                  maxH={{ base: "200px", md: "none" }}
                  overflowY={{ base: "scroll", md: "visible" }}
                  className="checkbox-container"
                >
                  <Grid
                    marginTop={2}
                    templateColumns={{
                      base: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                    }}
                    gap={2}
                  >
                    {availableTags.map((tag, index) => (
                      <Checkbox
                        key={index}
                        colorScheme="purple"
                        size="md"
                        color="codex.accents"
                        isChecked={selectedTags.includes(tag)}
                        onChange={() => handleTagChange(tag)}
                        marginRight={{ base: 1, md: 2 }}
                        _hover={{
                          fontWeight: "bold", // Make the text bold on hover
                          cursor: "pointer",
                        }}
                      >
                        <Text>{tag}</Text>
                      </Checkbox>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>

            <Divider my={1} borderColor="codex.highlights" />

            <Box
              w="full"
              border="1px solid"
              borderColor="codex.borders"
              borderRadius="lg"
              bg="codex.darkest"
            >
              {snippets?.map((snippet, index) => (
                <Box
                  key={index}
                  pb="5"
                  w="full"
                  borderBottom="1px solid"
                  borderColor="codex.borders"
                >
                  <MainSnippetPreview snippet={snippet} />
                  <HStack color="codex.text">
                    <Button
                      variant="icon"
                      size="sm"
                      onClick={() => {
                        if (snippet) {
                          handleAddDrops(snippet._id);
                        }
                      }}
                      color={
                        snippet.drops.includes(currentUser)
                          ? "codex.highlights"
                          : "codex.borders"
                      }
                    >
                      <Icon as={FaAngleDoubleDown} w={8} h={8} ml="2" />
                    </Button>
                    <Text color="codex.highlights" fontSize="sm">
                      Props: {snippet.overallProps}
                    </Text>
                    <Button
                      variant="icon"
                      size="sm"
                      onClick={() => {
                        if (snippet) {
                          handleAddProps(snippet._id);
                        }
                      }}
                      color={
                        snippet.props.includes(currentUser)
                          ? "codex.highlights"
                          : "codex.borders"
                      }
                    >
                      <Icon as={FaAngleDoubleUp} w={8} h={8} mr="2" />
                    </Button>
                  </HStack>
                </Box>
              ))}
            </Box>
          </VStack>
        </Flex>
      </Box>
    </>
  );
}
