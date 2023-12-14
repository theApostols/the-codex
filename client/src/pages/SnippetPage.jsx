import React, { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import { Box, Textarea, Button, VStack, Select } from "@chakra-ui/react";
import { SAVE_SNIPPET } from "../utils/actions";

export default function SnippetPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript"); // default language is javascript

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleSave = () => {
    // insert SAVE_SNIPPET logic here
    console.log("Code saved:", code);
    console.log("Selected language:", language);
  };

  return (
    <VStack align="stretch" spacing={4} p={4}>
      <Box>
        <Textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          placeholder="Enter your code snippet here"
          rows={10}
          cols={40}
        />
      </Box>
      <Select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value)}
      >
        <option value="angular">Angular</option>
        <option value="aspnet">ASP.NET</option>
        <option value="c">C</option>
        <option value="c++">C++</option>
        <option value="c#">C#</option>
        <option value="css">CSS</option>
        <option value="django">Django</option>
        <option value="flask">Flask</option>
        <option value="express">Express</option>
        <option value="git">Git</option>
        <option value="go">Go</option>
        <option value="graphql">GraphQL</option>
        <option value="html">HTML</option>
        <option value="java">Java</option>
        <option value="javascript">JavaScript</option>
        <option value="jquery">jQuery</option>
        <option value="kotlin">Kotlin</option>
        <option value="markdown">Markdown</option>
        <option value="mongoose">Mongoose</option>
        <option value="mongodb">MongoDB</option>
        <option value="mysql">MySQL</option>
        <option value="node">Node.js</option>
        <option value="oracle">Oracle</option>
        <option value="php">PHP</option>
        <option value="postgresql">PostgreSQL</option>
        <option value="python">Python</option>
        <option value="react">React</option>
        <option value="redux">Redux</option>
        <option value="ruby">Ruby</option>
        <option value="sass">Sass</option>
        <option value="shell">Shell (Bash, PowerShell)</option>
        <option value="springboot">Spring Boot</option>
        <option value="sqlite">SQLite</option>
        <option value="swift">Swift</option>
        <option value="typescript">TypeScript</option>
        <option value="vue">Vue</option>
        {/* will add more languages if we need too, 
        these are the most commonly used by web developers */}
      </Select>
      <CodeEditor code={code} language={language} />
      <Button colorScheme="blue" onClick={handleSave}>
        Save
      </Button>
    </VStack>
  );
}
