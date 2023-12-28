import React from "react";
import { Select, FormLabel, Input } from "@chakra-ui/react";

const LanguageSelector = ({
  value,
  onChange,
  customLanguage,
  onCustomLanguageChange,
}) => {
  return (
    <>
      <FormLabel color="codex.accents">Choose Language:</FormLabel>
      <Select
        bg="codex.borders"
        color="black"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
      {value === "custom" && (
        <Input
          type="text"
          placeholder="Enter custom language"
          value={customLanguage}
          onChange={(e) => onCustomLanguageChange(e)}
        />
      )}
    </>
  );
};


export default LanguageSelector;
