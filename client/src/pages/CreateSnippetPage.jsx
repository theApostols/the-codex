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
  Checkbox,
  FormLabel,
  Icon,
} from "@chakra-ui/react";
import { BiSave } from "react-icons/bi";
import { CREATE_SNIPPET } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { GET_USER_SNIPPETS } from "../utils/queries";
import SnippetDisplay from "../components/Snippet/Snippet2";

export default function CreateSnippetPage() {
  const [snippetTitle, setSnippetTitle] = useState("");
  const [snippetText, setSnippetText] = useState("");
  const [code, setCode] = useState("");

  const [language, setLanguage] = useState("javascript"); // default language is javascript
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
  const availableTags = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

  //////////////////Handlers//////////////////////

  const handleSnippetTitleChange = (e) => {
    setSnippetTitle(e.target.value);
  };

  const handleSnippetTextChange = (e) => {
    setSnippetText(e.target.value);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
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

  const handleResourceTitleChange = (e) => {
    setResourceTitle(e.target.value);
  };

  const handleResourceLinkChange = (e) => {
    setResourceLink(e.target.value);
  };

  const handleToggleResourceFields = () => {
    setShowResourceFields(!showResourceFields);
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
      resources: showResourceFields
        ? [{ title: resourceTitle, link: resourceLink }]
        : [],
      tags: selectedTags,
    });
  }, [
    snippetTitle,
    snippetText,
    code,
    showResourceFields,
    resourceTitle,
    resourceLink,
    selectedTags,
  ]);

  const handleCreateSnippet = async () => {
    try {
      const response = await createSnippet({
        variables: snippetData,
      });
      console.log("Snippet created:", response.data.createSnippet);

      // Show message to confirm snippet was created
      setCreateMessage(true);

      // Reset form data once snippet is created
      setSnippetTitle("");
      setSnippetText("");
      setCode("");
      setLanguage("javascript");
      setCustomLanguage("");
      setShowResourceFields(false);
      setResourceTitle("");
      setResourceLink("");
      setSelectedTags([]);
    } catch (error) {
      console.error("Error creating snippet:", error);
    }

    console.log("Snippet Title:", snippetTitle);
    console.log("Snippet Text:", snippetText);
    console.log("Code saved:", code);
    // console.log("Selected language:", language);
    console.log("Selected language:", selectedLanguage);
    if (showResourceFields) {
      console.log("Resource Title:", resourceTitle);
      console.log("Resource Link:", resourceLink);
    }
    if (showTagsSection) {
      console.log("Tags:", selectedTags);
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

  ////////GET USER SNIPPETS////////////////////
  //////// DELETE THIS BLOCK LATER ///////////
  const { loading, error, data } = useQuery(GET_USER_SNIPPETS, {
    variables: { username: Auth.getProfile().data.username },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log("data:", data);

  const userSnippets = data.userSnippets || [];

  ////////////////////////////////////////////

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
        <Box w="full">
          {/*Text area for code snippet input*/}
          <Textarea
            borderLeft="4px"
            borderColor="codex.accents"
            borderRight="0"
            borderTop="0"
            borderBottom="0"
            bg="codex.darkest"
            color="codex.text"
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            placeholder="Enter your code snippet here"
            rows={10}
            cols={40}
          />
        </Box>
        <Box w="full">
          {/* Language dropdown */}
          <LanguageSelector
            value={language}
            onChange={(value) => handleLanguageChange(value)}
          />
        </Box>
        {/*MORE code blocks*/}


        <Box w="full">
          {/* Toggle Resource Fields button */}
          <Button
            variant="secondary"
            onClick={handleToggleResourceFields}
            size="sm"
          >
            {showResourceFields ? "Hide Resource Fields" : "Add Resource"}
          </Button>
          {showResourceFields && (
            <VStack mt={4} spacing={4}>
              <Box w="full">
                <Input
                  bg="codex.darkest"
                  type="text"
                  placeholder="Resource Title"
                  value={resourceTitle}
                  onChange={handleResourceTitleChange}
                />
              </Box>
              <Box w="full">
                <Input
                  bg="codex.darkest"
                  type="text"
                  placeholder="Resource Link"
                  value={resourceLink}
                  onChange={handleResourceLinkChange}
                />
              </Box>
            </VStack>
          )}
        </Box>
        {/* Toggle Tags Section */}
        <Box w="full">
          <Button variant="secondary" onClick={handleToggleTags} size="sm">
            {showTagsSection ? "Hide Tags" : "Add Tags"}
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
        <Box w="full">
          {/*Code editor component for syntax highlighting*/}
          <CodeEditor code={code} language={language} />

          {/*Save button*/}
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
