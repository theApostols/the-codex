import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Box } from '@chakra-ui/react';

const CodeEditor = ({ code }) => {
  return (
    <Box p={4} borderRadius="md" borderWidth="1px" overflow="auto">
      <SyntaxHighlighter language="javascript" style={docco}>
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeEditor;