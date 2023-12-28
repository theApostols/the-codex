import React, { useState, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import LanguageSelector from "../components/LanguageSelector";
import {
  Box,
  Textarea,
  Button,
  VStack,
  Select,
  Input,
  Text,
  Flex,
  Grid,
  Checkbox,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { BiSave } from "react-icons/bi";
import { CREATE_SNIPPET } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { GET_USER_SNIPPETS } from "../utils/queries";

export default function CreateSnippetPage() {
  // State to manage an array of snippet data
  const [snippetList, setSnippetList] = useState([
    { language: "javascript", code: "" },
  ]);

  const [resources, setResources] = useState([]);

  const [snippetTitle, setSnippetTitle] = useState("");
  const [snippetText, setSnippetText] = useState("");
  const [code, setCode] = useState([""]);

  const [language, setLanguage] = useState(["javascript"]);

  // give user an option to enter a custom language if their language is not listed
  const [customLanguage, setCustomLanguage] = useState("");
  const selectedLanguage = customLanguage || language;

  // give user an option to add a resource to their snippet
  const [showResourceFields, setShowResourceFields] = useState(false);
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceLink, setResourceLink] = useState("");

  //Message to confirm snippet was created
  const [createMessage, setCreateMessage] = useState(false);

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

  //////////////////Handlers//////////////////////

  // Function to add a new snippet box
  const handleAddSnippetBox = () => {
    setSnippetList((prevList) => [
      ...prevList,
      { language: "javascript", code: "" },
    ]);
  };

  // Function to remove a snippet box by index
  const handleRemoveSnippetBox = (index) => {
    setSnippetList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };

  const handleSnippetTitleChange = (e) => {
    setSnippetTitle(e.target.value);
  };

  const handleSnippetTextChange = (e) => {
    setSnippetText(e.target.value);
  };

  const handleCodeChange = (newCode, index) => {
    setCode((prevCode) => {
      const newCodeArray = [...prevCode];
      newCodeArray[index] = newCode;
      return newCodeArray;
    });
  };

  const handleLanguageChange = (selectedLanguage, index) => {
    setLanguage((prevLanguages) => {
      const newLanguages = [...prevLanguages];
      newLanguages[index] = selectedLanguage;
      return newLanguages;
    });
    // clear customLanguage when a predefined language is selected
    setCustomLanguage("");
  };

  const handleCustomLanguageChange = (e) => {
    // set customLanguage to the value of user input if they choose to enter a custom language
    // trim whitespace, convert to lowercase, and capitalize the first letter
    setCustomLanguage(
      e.target.value
        .trim()
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase())
    );
  };

  const handleResourceTitleChange = (e, index) => {
    const newResources = [...resources];
    newResources[index].title = e.target.value;
    setResources(newResources);
  };

  const handleResourceLinkChange = (e, index) => {
    const newResources = [...resources];
    newResources[index].link = e.target.value;
    setResources(newResources);
  };

  const handleAddResource = () => {
    // Check if there are no resources, then add the first one
    if (resources.length === 0) {
      setResources([{ title: "", link: "" }]);
    } else {
      // If there are already resources, add a new empty resource
      setResources((prevResources) => [
        ...prevResources,
        { title: "", link: "" },
      ]);
    }
    setShowResourceFields(true); // Set showResourceFields to true when adding a new resource
  };

  const handleRemoveResource = (index) => {
    const newResources = [...resources];
    newResources.splice(index, 1);
    setResources(newResources);
  };

  const handleToggleTags = () => {
    setShowTagsSection(!showTagsSection);
  };

  const handleTagChange = (tag) => {
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

  ///////////CREATE SNIPPET BLOCK////////////////////

  const [createSnippet] = useMutation(CREATE_SNIPPET);

  const [snippetData, setSnippetData] = useState({
    username: "",
    snippetTitle: "",
    snippetText: "",
    snippetCode: [],
    resources: showResourceFields
      ? [{ title: resourceTitle, link: resourceLink }]
      : [],
    tags: selectedTags,
  });

  useEffect(() => {
    // const getUsername = Auth.loggedIn() ? Auth.getProfile().data.username : null;
    const getUsername = Auth.getProfile().data.username;
    setSnippetData({
      ...snippetData,
      username: getUsername,
      snippetTitle: snippetTitle,
      snippetText: snippetText,
      snippetCode: [{ language: language, code: code }],
      resources: showResourceFields ? resources : [],
      tags: selectedTags,
    });
  }, [
    snippetTitle,
    snippetText,
    code,
    showResourceFields,
    resources,
    selectedTags,
  ]);

  const handleCreateSnippet = async () => {
    try {
      const response = await createSnippet({
        variables: {
          ...snippetData,
          snippetCode: code.map((snippetCode, index) => ({
            language: language[index] || "javascript", // Default to "javascript" if language is not provided
            code: snippetCode,
          })),
        },
      });

      // Show message to confirm snippet was created
      setCreateMessage(true);

      // Reset form data once snippet is created
      setSnippetTitle("");
      setSnippetText("");
      setCode([""]);
      setLanguage(["javascript"]);
      setCustomLanguage("");
      setShowResourceFields(false);
      setResources([]);
      setSelectedTags([]);

      // Reset snippetList to initial state
      setSnippetList([{ language: "javascript", code: "" }]);
      window.location.assign(
        `/individual-snippets/${response.data.createSnippet._id}`
      );
    } catch (error) {
      console.error("Error creating snippet:", error);
    }
  };

  ////////////////////////////////////////////////

  useEffect(() => {
    //Hide success creation message after 3 seconds
    if (createMessage) {
      const timer = setTimeout(() => {
        setCreateMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [createMessage]);

  return (
    <Box p="50" d="flex" alignItems="center" justifyContent="center">
      <VStack
        spacing="4"
        w="full"
        maxW="5xl"
        mx="auto"
        p="8"
        borderRadius="lg"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        bg="rgba(45, 55, 72, 0.8)"
        backdropFilter="saturate(100%) blur(10px)"
        color="white"
      >
        <Heading textAlign="center" color="codex.text" mb="6">
          Create Snippet
        </Heading>
        <Box w="full">
          {/* Snippet title */}
          <Input
            borderLeft="4px"
            borderColor="codex.accents"
            borderRight="0"
            borderTop="0"
            borderBottom="0"
            bg="codex.darkest"
            color="codex.text"
            type="text"
            placeholder="Enter Snippet Title"
            value={snippetTitle}
            onChange={handleSnippetTitleChange}
          />
        </Box>
        <Box w="full">
          {/* Snippet text */}
          <Textarea
            borderLeft="4px"
            borderColor="codex.accents"
            borderRight="0"
            borderTop="0"
            borderBottom="0"
            bg="codex.darkest"
            color="codex.text"
            type="text"
            value={snippetText}
            onChange={(e) => handleSnippetTextChange(e)}
            placeholder="Say something about your snippet!"
            rows={5}
            cols={40}
          />
        </Box>
        {snippetList.map((snippet, index) => (
          <Box key={index} w="full">
            {/* Text area for code snippet input */}
            <Textarea
              borderLeft="4px"
              borderColor="codex.accents"
              borderRight="0"
              borderTop="0"
              borderBottom="0"
              bg="codex.darkest"
              color="codex.text"
              value={code[index]}
              onChange={(e) => handleCodeChange(e.target.value, index)}
              placeholder="Enter your code snippet here"
              rows={10}
              cols={40}
              mb={4}
            />
            {/* Language dropdown */}
            <LanguageSelector
              value={language[index]} // Update this line
              onChange={(value) => handleLanguageChange(value, index)}
            />
            {/* Button to remove the snippet box */}
            <Button
              variant="secondary"
              onClick={() => handleRemoveSnippetBox(index)}
              size="sm"
              mt={4}
            >
              Remove Snippet
            </Button>
          </Box>
        ))}
        <Button variant="secondary" onClick={handleAddSnippetBox} size="sm">
          Add Snippet
        </Button>
        {/*MORE code blocks*/}
        {/* Add resources section */}
        <Box w="full">
          <VStack mt={4} spacing={4}>
            {showResourceFields &&
              resources.map((resource, index) => (
                <Box key={index} w="full">
                  <Input
                    bg="codex.darkest"
                    type="text"
                    placeholder="Resource Title"
                    value={resource.title}
                    onChange={(e) => handleResourceTitleChange(e, index)}
                  />
                  <Input
                    bg="codex.darkest"
                    type="text"
                    placeholder="Resource Link"
                    mt={4}
                    value={resource.link}
                    onChange={(e) => handleResourceLinkChange(e, index)}
                  />
                  <Button
                    variant="secondary"
                    onClick={() => handleRemoveResource(index)}
                    size="sm"
                    mt={4}
                  >
                    Remove Resource
                  </Button>
                </Box>
              ))}
            <Button variant="secondary" onClick={handleAddResource} size="sm">
              Add Resource
            </Button>
          </VStack>
        </Box>
        {/* Toggle Tags Section */}
        <Box w="full">
          <Button variant="secondary" onClick={handleToggleTags} size="sm">
            {showTagsSection ? "Hide Tags" : "Add Tags"}
          </Button>
          {showTagsSection && (
            <Grid
              marginTop={2}
              templateColumns="repeat(3, 1fr)"
              gap={2}
            >
              {availableTags.map((tag, index) => (
                <Checkbox
                  colorScheme="purple"
                  size="md"
                  color="codex.accents"
                  key={index}
                  isChecked={selectedTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                  mr={8}
                  mt={1} // adds margin between tags
                >
                  {tag}
                </Checkbox>
              ))}
            </Grid>
          )}
        </Box>
        <Box w="full">
          <Box w="full">
            {/*Code editor component for syntax highlighting*/}
            {snippetList.map((snippet, index) => (
              <CodeEditor
                key={index}
                code={code[index]}
                language={language[index] || "javascript"}
                activeSnippetIndex={index}
              />
            ))}
          </Box>
          <Box pt="5">
            <Button variant="secondary" onClick={handleCreateSnippet}>
              <Icon as={BiSave} w={6} h={8} mr="2" color="codex.text" />
              Save
            </Button>
          </Box>
          {/*Message to confirm snippet was created*/}
          {createMessage && (
            <Text color="codex.accents200" fontWeight="bold">
              Snippet created!
            </Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
}
