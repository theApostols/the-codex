import { Box, Text, Button, VStack, Code } from "@chakra-ui/react";
import theme from "../../utils/theme";
import CodeEditor from "../CodeEditor";

// Added default value to the snippet renders on the userpage
const SnippetPreview = (snippet) => {
  // console.log(snippet);
  const snippetData = snippet.snippet;
  // console.log(snippetData.snippetCode[0].code);
  return (
    <>
      <Box p={4} borderRadius="md" borderWidth="1px">
        <Text fontSize="xl" fontWeight="bold">
          {snippetData.snippetTitle}
        </Text>
        <Text fontSize="sm" color="codex.accents">
          Created by {snippetData.username} on{" "}
          {snippetData.formattedCreationDate}
        </Text>
        {/* if there is an edit date, display it */}
        {snippetData.formattedEditDate && (
          <Text fontSize="sm" color="codex.accents">
            Last edited on {snippetData.formattedEditDate}
          </Text>
        )}

        <Text>{snippetData.snippetText}</Text>

        {
          <CodeEditor
          // code={snippetCode.length > 0 ? snippetCode.code : ""}
          // language={snippetCode.length > 0 ? snippetCode.language : ""}
          />
        }

        <VStack mt={4} align="start" spacing={2}>
          {/* add a button to drop (dislike) */}
          <Button variant="secondary" size="sm">
            Drop
          </Button>
          {/* display total props */}
          <Text fontSize="sm">Props: {snippetData.overallProps}</Text>
          {/* add a button to prop */}
          <Button variant="outline" size="sm">
            Prop
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default SnippetPreview;
