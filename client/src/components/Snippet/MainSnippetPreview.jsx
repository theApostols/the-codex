import {
  Box,
  Text,
  Button,
  VStack,
  Code,
  Icon,
  HStack,
  Flex,
} from "@chakra-ui/react";
import {
  BiBookmarkAltMinus,
  BiBookmarkAltPlus,
  BiEdit,
  BiTrash,
} from "react-icons/bi";
import CodeEditor from "../CodeEditor";

// Added default value to the snippet renders on the userpage
const SnippetPreview = ({ snippet }) => {
  // Check if snippetData and snippetCode exist before accessing
  console.log("This is the snippetData", snippet);
  if (snippet && snippet.snippetCode && snippet.snippetCode.length > 0) {
    const snippetData = snippet;

    return (
      <>
        <Box p={4} borderRadius="md">
          <Text fontSize="sm" color="codex.accents300">
            Created by {snippetData.username} on{" "}
            {snippetData.formattedCreationDate}
          </Text>
          <VStack
            align={["center", "flex-start"]}
            spacing="4"
            w="full"
            maxW="5xl"
            mx="auto"
            p="4"
            borderRadius="lg"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            bg="rgba(45, 55, 72, 0.8)"
            backdropFilter="saturate(100%) blur(10px)"
            color="codex.text"
          >
            <Text fontSize="xl" fontWeight="bold">
              {snippetData.snippetTitle}
            </Text>

            {/* if there is an edit date, display it */}
            {snippetData.formattedEditDate && (
              <Text fontSize="sm" color="codex.accents">
                Last edited on {snippetData.formattedEditDate}
              </Text>
            )}

            <Text>{snippetData.snippetText}</Text>

            <Box w="full">
              {/* Map through all code blocks and render CodeEditor for each */}
              {snippetData.snippetCode.map((codeBlock, index) => (
                <CodeEditor
                  key={index}
                  code={codeBlock.code}
                  // Assuming you also have a property like codeBlock.language
                  // language={codeBlock.language}
                />
              ))}
            </Box>

            {/* Add your other components or elements here */}
          </VStack>
        </Box>
      </>
    );
  } else {
    // Render nothing or a placeholder for when snippetData.snippetCode doesn't exist or is empty
    return null;
  }
};

export default SnippetPreview;
