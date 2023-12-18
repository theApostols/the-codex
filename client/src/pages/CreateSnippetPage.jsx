import React, { useState, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
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
} from "@chakra-ui/react";
import { CREATE_SNIPPET } from "../utils/mutations";
import customTheme from "../utils/theme";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

export default function CreateSnippetPage() {
  const [snippetTitle, setSnippetTitle] = useState("");
  const [snippetText, setSnippetText] = useState("");
  const [code, setCode] = useState("");

  const [language, setLanguage] = useState("javascript"); // default language is javascript
  // give user an option to enter a custom language if their language is not listed
  const [customLanguage, setCustomLanguage] = useState("");

  // give user an option to add a resource to their snippet
  const [showResourceFields, setShowResourceFields] = useState(false);
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceLink, setResourceLink] = useState("");

  //Message to confirm snippet was created
  const [createMessage, setCreateMessage] = useState(false);

  // set state for Tags
  const [showTagsSection, setShowTagsSection] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  // sample tags
  const availableTags = 
  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];


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

  // const handleTagChange = (index) => {
  //   const updatedTags = [...tags];
  //   updatedTags[index] = !updatedTags[index]; // toggle the tag
  //   setTags(updatedTags);
  // };
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

  const [createSnippet] = useMutation(CREATE_SNIPPET);

  const [snippetData, setSnippetData] = useState({
    username: "",
    snippetTitle: "",
    snippetText: "",
    snippetCode: [code],
    resources: showResourceFields ? [{ title: resourceTitle, link: resourceLink }] : [],
    tags: selectedTags,
  });

  useEffect(() => {
    // const getUsername = Auth.loggedIn() ? Auth.getProfile().data.username : null;
    const getUsername = Auth.getProfile().data.username;
    setSnippetData({ ...snippetData, username: getUsername });
  }, []);

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
    } catch (error) {
      console.error("Error creating snippet:", error);
    }

    const selectedLanguage = customLanguage || language;

    console.log("Snippet Title:", snippetTitle);
    console.log("Snippet Text:", snippetText);
    console.log("Code saved:", code);
    // console.log("Selected language:", language);
    console.log("Final language:", selectedLanguage);
    if (showResourceFields) {
      console.log("Resource Title:", resourceTitle);
      console.log("Resource Link:", resourceLink);
    }
    if (showTagsSection) {
      console.log("Tags:", selectedTags);
    }
  };

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
    <VStack align="stretch" spacing={4} p={4}>
      <Box>
        {/* Snippet title */}
        <Input
          type="text"
          placeholder="Enter Snippet Title"
          value={snippetTitle}
          onChange={handleSnippetTitleChange}
        />
      </Box>
      <Box>
        {/* Snippet text */}
        <Textarea
          value={snippetText}
          onChange={(e) => handleSnippetTextChange(e)}
          placeholder="Say something about your snippet!"
          rows={5}
          cols={40}
        />
      </Box>
      <Box>
        {/*Text area for code snippet input*/}
        <Textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          placeholder="Enter your code snippet here"
          rows={10}
          cols={40}
        />
      </Box>
      {/*Dropdown menu for syntax highlighting*/}
      <Text>Choose Language:</Text>
      <Select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value)}
      >
        <option value="apache">Apache</option>
        <option value="bash">Bash</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="csharp">C#</option>
        <option value="css">CSS</option>
        <option value="django">Django</option>
        <option value="dockerfile">Dockerfile</option>
        <option value="express">Express</option>
        <option value="elixir">Elixir</option>
        <option value="excel">Excel</option>
        <option value="go">Go</option>
        <option value="handlebars">Handlebars</option>
        <option value="html">HTML</option>
        <option value="java">Java</option>
        <option value="javascript">JavaScript</option>
        <option value="jquery">jQuery</option>
        <option value="json">JSON</option>
        <option value="jsx">JSX</option>
        <option value="kotlin">Kotlin</option>
        <option value="markdown">Markdown</option>
        <option value="mongoose">Mongoose</option>
        <option value="mongodb">MongoDB</option>
        <option value="mysql">MySQL</option>
        <option value="node">Node.js</option>
        <option value="oracle">Oracle</option>
        <option value="perl">Perl</option>
        <option value="powershell">Powershell</option>
        <option value="php">PHP</option>
        <option value="postgresql">PostgreSQL</option>
        <option value="python">Python</option>
        <option value="ruby">Ruby</option>
        <option value="rust">Rust</option>
        <option value="sass">Sass</option>
        <option value="shell">Shell</option>
        <option value="springboot">Spring Boot</option>
        <option value="sql">SQL</option>
        <option value="swift">Swift</option>
        <option value="typescript">TypeScript</option>
        <option value="vim">Vim</option>
        <option value="vue">Vue</option>
        <option value="xml">XML</option>
        <option value="yaml">YAML</option>
        <option value="zephir">Zephir</option>
        <option value="custom">Other (Please specify)</option>
      </Select>
      {/* display the input for custom language if "Other" is selected */}
      {language === "custom" && (
        <input
          type="text"
          placeholder="Enter custom language"
          value={customLanguage}
          onChange={handleCustomLanguageChange}
        />
      )}
      <Box>
        {/* Toggle Resource Fields button */}
        <Button onClick={handleToggleResourceFields} size="sm">
          {showResourceFields ? "Hide Resource Fields" : "Add Resource"}
        </Button>
        {showResourceFields && (
          <>
            {/* input fields for resource */}
            <Input
              type="text"
              placeholder="Resource Title"
              value={resourceTitle}
              onChange={handleResourceTitleChange}
            />
            <Input
              type="text"
              placeholder="Resource Link"
              value={resourceLink}
              onChange={handleResourceLinkChange}
            />
          </>
        )}
      </Box>
      {/* Toggle Tags Section */}
      <Box>
        <Button onClick={handleToggleTags} size="sm">
          {showTagsSection ? "Hide Tags" : "Add Tags"}
        </Button>
        {showTagsSection && (
          <Flex wrap="wrap" marginTop={2}>
            {availableTags.map((tag, index) => (
              <Checkbox
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
      {/*Code editor component for syntax highlighting*/}
      <CodeEditor code={code} language={language} />
      {/*Save button*/}
      <Button variant="secondary" onClick={handleCreateSnippet}>
        Create Snippet
      </Button>
      {/*Message to confirm snippet was created*/}
      {createMessage && (
        <Text color="green.500" fontWeight="bold">
          Snippet created!
        </Text>
      )}
    </VStack>
  );
}
