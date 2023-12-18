import React, { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import {
  Box,
  Textarea,
  Button,
  VStack,
  Select,
  Input,
  FormLabel,
  Icon,
} from "@chakra-ui/react";
import { SAVE_SNIPPET } from "../utils/actions";
import theme from "../utils/theme";
import { BiSave } from "react-icons/bi";



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

  const handleSave = () => {
    // insert SAVE_SNIPPET logic here
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
  };

  return (
    <Box
      p="50"
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
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
            bg="codex.darkest"
            color="codex.text"
            value={snippetText}
            onChange={(e) => handleSnippetTextChange(e.target.value)}
            placeholder="Say something about your snippet!"
            rows={5}
            cols={40}
          />
        </Box>
        <Box w="full">
          {/*Text area for code snippet input*/}
          <Textarea
            bg="codex.darkest"
            color="codex.text"
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            placeholder="Enter your code snippet here"
            rows={10}
            cols={40}
          />
        </Box>
        {/*Dropdown menu for syntax highlighting*/}
        <FormLabel color="codex.accents">Choose Language:</FormLabel>
        <Select
          bg="codex.borders"
          color="codex.text"
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
                type="text"
                placeholder="Resource Title"
                value={resourceTitle}
                onChange={handleResourceTitleChange}
              />
            </Box>
            <Box w="full">
              <Input
                type="text"
                placeholder="Resource Link"
                value={resourceLink}
                onChange={handleResourceLinkChange}
              />
            </Box>
          </VStack>
          )}
        </Box>
        <Box w="full">
          {/*Code editor component for syntax highlighting*/}
          <CodeEditor code={code} language={language} />
          {/*Save button*/}
          <Box pt="5">
            <Button variant="secondary" onClick={handleSave}>
            <Icon as={BiSave} w={6} h={8} mr="2" color="codex.text"/>
              Save
            </Button>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
}
