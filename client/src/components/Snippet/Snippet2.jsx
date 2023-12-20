import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import CodeEditor from '../CodeEditor';
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// // import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { agate } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import {
//   apache,
//   bash,
//   c,
//   cpp,
//   csharp,
//   css,
//   django,
//   dockerfile,
//   elixir,
//   excel,
//   go,
//   handlebars,
//   java,
//   javascript,
//   json,
//   kotlin,
//   markdown,
//   perl,
//   powershell,
//   php,
//   python,
//   ruby,
//   rust,
//   shell,
//   sql,
//   swift,
//   typescript,
//   vim,
//   xml,
//   yaml,
//   zephir,
// } from 'react-syntax-highlighter/dist/esm/languages/hljs';

// // register supported languages for syntax highlighting
// SyntaxHighlighter.registerLanguage('javascript', javascript);
// SyntaxHighlighter.registerLanguage('apache', apache);
// SyntaxHighlighter.registerLanguage('bash', bash);
// SyntaxHighlighter.registerLanguage('c', c);
// SyntaxHighlighter.registerLanguage('cpp', cpp);
// SyntaxHighlighter.registerLanguage('csharp', csharp);
// SyntaxHighlighter.registerLanguage('css', css);
// SyntaxHighlighter.registerLanguage('django', django);
// SyntaxHighlighter.registerLanguage('dockerfile', dockerfile);
// SyntaxHighlighter.registerLanguage('elixir', elixir);
// SyntaxHighlighter.registerLanguage('excel', excel);
// SyntaxHighlighter.registerLanguage('go', go);
// SyntaxHighlighter.registerLanguage('handlebars', handlebars);
// SyntaxHighlighter.registerLanguage('java', java);
// SyntaxHighlighter.registerLanguage('javascript', javascript);
// SyntaxHighlighter.registerLanguage('json', json);
// SyntaxHighlighter.registerLanguage('kotlin', kotlin);
// SyntaxHighlighter.registerLanguage('markdown', markdown);
// SyntaxHighlighter.registerLanguage('perl', perl);
// SyntaxHighlighter.registerLanguage('powershell', powershell);
// SyntaxHighlighter.registerLanguage('php', php);
// SyntaxHighlighter.registerLanguage('python', python);
// SyntaxHighlighter.registerLanguage('ruby', ruby);
// SyntaxHighlighter.registerLanguage('rust', rust);
// SyntaxHighlighter.registerLanguage('shell', shell);
// SyntaxHighlighter.registerLanguage('sql', sql);
// SyntaxHighlighter.registerLanguage('swift', swift);
// SyntaxHighlighter.registerLanguage('typescript', typescript);
// SyntaxHighlighter.registerLanguage('vim', vim);
// SyntaxHighlighter.registerLanguage('xml', xml);
// SyntaxHighlighter.registerLanguage('yaml', yaml);
// SyntaxHighlighter.registerLanguage('zephir', zephir);

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
        {/* <CodeEditor code={snippetCode} /> */}

      
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
