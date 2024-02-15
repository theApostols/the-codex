import { React, useContext } from 'react';
import { ThemeContext } from '../../main';
// import react-syntax-highlighter styles and languages
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';

import { agate, atelierCaveLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  apache,
  bash,
  c,
  cpp,
  csharp,
  css,
  django,
  dockerfile,
  elixir,
  excel,
  go,
  handlebars,
  java,
  javascript,
  json,
  kotlin,
  markdown,
  perl,
  powershell,
  php,
  python,
  ruby,
  rust,
  shell,
  sql,
  swift,
  typescript,
  vim,
  xml,
  yaml,
  zephir,
} from 'react-syntax-highlighter/dist/esm/languages/hljs';

// register supported languages for syntax highlighting
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('apache', apache);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('c', c);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('django', django);
SyntaxHighlighter.registerLanguage('dockerfile', dockerfile);
SyntaxHighlighter.registerLanguage('elixir', elixir);
SyntaxHighlighter.registerLanguage('excel', excel);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('handlebars', handlebars);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('kotlin', kotlin);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('perl', perl);
SyntaxHighlighter.registerLanguage('powershell', powershell);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('ruby', ruby);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('shell', shell);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('swift', swift);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('vim', vim);
SyntaxHighlighter.registerLanguage('xml', xml);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('zephir', zephir);


import { Box } from '@chakra-ui/react';

const CodeEditor = ({ code,language }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const selectedStyle = isDarkMode ? agate : atelierCaveLight;
  
  // determine language based on user selection
  const highlightedLanguage = language === 'custom' ? 'javascript' : language;


  return (
    <Box p={4} borderRadius="md" borderWidth="1px" borderColor="codex.highlights" bg="codex.darkest"overflow="auto">
      <SyntaxHighlighter
        lineProps={{style: {wordBreak: 'break-word', whiteSpace: 'pre-wrap'}}}
        wrapLongLines={true}
        //want to add line numbers but rendering weird when wrapping
        // showLineNumbers={true}
        language={highlightedLanguage} 
        style={ selectedStyle }>
          {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeEditor;