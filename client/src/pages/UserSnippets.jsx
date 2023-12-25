import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import MainSnippetPreview from "../components/Snippet/MainSnippetPreview.jsx";
import { GET_USER_SNIPPETS } from "../utils/queries";
import { Box, Flex, VStack, HStack, Button, Icon, Text, Input, Avatar, Heading, Divider, Checkbox } from "@chakra-ui/react";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

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
  const paragraphStyle = {
    fontSize: "18px",
    color: "white",
    fontWeight: "bold",
  };
  //defines state for searching for users
  const [userSearch, setUserSearch] = useState('');

  //retrieve user route parameter
  const {username} = useParams();

  // Use the useQuery hook to execute the GET_USER_SNIPPETS query
  const { loading, error, data, refetch } = useQuery(GET_USER_SNIPPETS,
  {
    variables: {username}
  });

  //refetch all snippets using updated tags upon state change
  useEffect(() => {
    if (loading) return; //eject from function if the page is still loading

    refetch({tags: selectedTags, username: username});
  }, [selectedTags, refetch, loading]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract snippets from the data
  const snippets = data.userSnippets.snippets;

  console.log(snippets);

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

  const handleInputChange = (event) => {
    const {value} = event.target;
    setUserSearch(value);
    console.log(userSearch);
  };

  //upon the user clicking the 'search' button, route to the user snippets page of the user they searched for
  const handleUserSearch = () =>
  {
    window.location.assign(`/user-snippets/${userSearch}`);
  }

  //if the user presses the 'enter' key while the user search input is in focus, attempt to search for that user
  const handleKeyPress = (event) =>
  {
    if (event.key === 'Enter')
    {
      handleUserSearch();
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
        <VStack
          spacing="4"
          w="full"
          maxW="5xl"
          mx="auto"
          p="8"
          color="codex.accents"
        >
          <HStack spacing = {4}>
            <Avatar
              size="2xl"
              src={`/images/file-uploads/${data?.userSnippets?.user?.image}`}
            />
            <Heading color="codex.accents" size = "3xl">{username}</Heading>
          </HStack>

          <Divider my = {1} borderColor="codex.highlights"/>

          {/* Toggle Tags Section */}
          <Box w="full">
            <Button variant="secondary" onClick={handleToggleTags} size="sm">
              {showTagsSection ? "Hide Tags" : "Select Tags"}
            </Button>
            {showTagsSection && (
              <Flex wrap="wrap" marginTop={2}>
                {availableTags.map((tag, index) => (
                  <Checkbox
                    colorScheme="teal"
                    size="lg"
                    color="codex.accents"
                    key={index}
                    isChecked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                    marginRight={2} // adds margin between tags
                  >
                    {tag}
                  </Checkbox>
                ))}
              </Flex>
            )}
          </Box>

          <HStack w = "full">
            <Input
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              value={userSearch}
            />
            <Button variant="secondary" onClick = {handleUserSearch}>Search</Button>
          </HStack>

          <Divider my = {1} borderColor="codex.highlights"/>

          <Box
            w="full"
            border="1px solid"
            borderColor="codex.borders"
            borderRadius="lg"
            bg="codex.darkest"
          >
            {snippets.map((snippet, index) => (
              <Box
                key={index}
                pb="5"
                w="full"
                borderBottom="1px solid"
                borderColor="codex.borders"
              >
                <Link to={`/individual-snippets/${snippet._id}`}>
                  <MainSnippetPreview snippet={snippet} />
                </Link>
                <HStack color="codex.text">
                  <Button variant="icon" size="sm">
                    <Icon as={FaAngleDoubleDown} w={8} h={8} mr="2" />
                  </Button>
                  <Text color="codex.highlights" fontSize="sm">
                    Props: {snippet.overallProps}
                  </Text>
                  <Button variant="icon" size="sm">
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
