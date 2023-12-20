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
import theme from "../../utils/theme";
import CodeEditor from "../CodeEditor";

// Added default value to the snippet renders on the userpage
const SnippetPreview = (snippet) => {
  // console.log(snippet);
  const snippetData = snippet.snippet;
  console.log(snippetData.snippetCode[0].code);
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

        {/* {
          <Box w="full">
          <CodeEditor
          // code={snippetCode.length > 0 ? snippetCode.code : ""}
          // language={snippetCode.length > 0 ? snippetCode.language : ""}
          />
          </Box>
        } */}

        {/* <HStack spacing={2}>
          <Button variant="icon" size="sm">
            <Icon as={BiBookmarkAltMinus} w={8} h={8} mr="2" />
          </Button>
          <Text color="codex.highlights" fontSize="sm">
            Props: {snippetData.overallProps}
          </Text>
          <Button variant="icon" size="sm">
            <Icon as={BiBookmarkAltPlus} w={8} h={8} mr="2" />
          </Button>
        </HStack> */}
        </VStack>
      </Box>
    </>
  );
};

export default SnippetPreview;
