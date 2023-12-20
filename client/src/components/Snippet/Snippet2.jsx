import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import CodeEditor from '../CodeEditor';

const SnippetDisplay = ({ snippet }) => {
  const { snippetTitle, snippetText, snippetCode, tags } = snippet;

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mb="2">
        {snippetTitle}
      </Text>
      <Text fontSize="md" color="codex.accents" mb="4">
        {snippetText}
      </Text>
      <CodeEditor code={snippetCode[0].code} language={snippetCode[0].language} />

      
      <Box mt="4">
        {tags.map((tag, index) => (
          <Box
            key={index}
            display="inline-block"
            bg="codex.accents"
            color="white"
            borderRadius="md"
            p="1"
            mr="2"
          >
            {tag}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SnippetDisplay;
