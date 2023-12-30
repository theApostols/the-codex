import { React, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  VStack,
  Heading,
  Flex,
  Checkbox,
  Divider,
  Button,
  Grid,
} from "@chakra-ui/react";
import { GET_SAVED_SNIPPETS } from "../utils/queries";
import MainSnippetPreview from "../components/Snippet/MainSnippetPreview";

export default function SavedSnippets() {
  // set state for Tags
  const [showTagsSection, setShowTagsSection] = useState(false);
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

  const { username } = useParams();

  const { data, loading, error, refetch } = useQuery(GET_SAVED_SNIPPETS, {
    variables: { username },
  });

  //refetch all snippets using updated tags upon state change
  useEffect(() => {
    if (loading) return; //eject from function if the page is still loading

    refetch({ tags: selectedTags });
  }, [selectedTags, refetch, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error!: {error.message}</div>;
  }

  const savedSnippets = data?.userSavedSnippets.savedSnippets || [];

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
          {/* Toggle Tags Section */}
          <Box w="full">
            <Button variant="secondary" onClick={handleToggleTags} size="sm">
              {showTagsSection ? "Hide Tags" : "Filter Tags"}
            </Button>
            {showTagsSection && (
              <Grid marginTop={2} templateColumns="repeat(3, 1fr)" gap={2}>
                {availableTags.map((tag, index) => (
                  <Checkbox
                    colorScheme="purple"
                    size="md"
                    color="codex.accents"
                    key={index}
                    isChecked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                    marginRight={2} // adds margin between tags
                  >
                    {tag}
                  </Checkbox>
                ))}
              </Grid>
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
