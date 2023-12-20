import React from "react";
import LanguageSelector from "../LanguageSelector";
import {
  Box,
  Textarea,
  Button,
  Select,
  Input,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";

const CodeBlock = ({ codeBlock, index, onRemoveCodeBlock, onCodeChange }) => {
  const { language, code } = codeBlock;

  return (
    <Box key={index} mt={index > 0 ? 4 : 0} position="relative">
      {/* Language dropdown */}
      <LanguageSelector
        value={language}
        onChange={(value) => onCodeChange(value, index, "language")}
      />

      {/* Text area for code snippet input */}
      <Textarea
        bg="codex.darkest"
        color="codex.text"
        value={code}
        onChange={(e) => onCodeChange(e.target.value, index, "code")}
        placeholder="Enter your code snippet here"
        rows={5}
        cols={40}
      />

      {/* Remove code block button */}
      {index > 0 && (
        <Button
          variant="link"
          color="codex.accents"
          position="absolute"
          top={2}
          right={2}
          onClick={() => onRemoveCodeBlock(index)}
        >
          <Icon as={BiTrash} />
        </Button>
      )}
    </Box>
  );
};

export default CodeBlock;
