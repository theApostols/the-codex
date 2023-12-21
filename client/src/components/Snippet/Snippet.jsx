import CodeEditor from "../CodeEditor";
import { useNavigate } from "react-router-dom";
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
  BiEdit,
  BiTrash,
} from "react-icons/bi";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

// Added default value to the snippet renders on the userpage
const Snippet = (snippet) => {
  const navigate = useNavigate();

  const handleCreateSnippet = () => {
    navigate("/createsnippet");
  };
  const snippetUsers = snippet.snippet;
  // console.log(snippetUsers);
  // console.log(
  //   "This is the snippet title =",
  //   snippetUsers.snippets[0].snippetTitle
  // );
  return (
    //<><p>Hello, World!</p></>
    <>
      <Box p="50" d="flex" alignItems="center" justifyContent="center">
        <VStack
          spacing="4"
          w="full"
          maxW="5xl"
          mx="auto"
          p="8"
          borderRadius="lg"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          border="1px solid rgba(255, 255, 255, 0.2)"
          bg="rgba(45, 55, 72, 0.8)"
          backdropFilter="saturate(100%) blur(10px)"
          color="white"
        >
          <Box
            borderLeft="4px"
            borderColor="codex.accents"
            borderRight="0"
            borderTop="0"
            borderBottom="0"
            p={4}
            w="full"
            borderRadius="lg"
            bg="codex.darkest"
          >
            <Text color="codex.text" fontSize="2xl" fontWeight="bold">
              {snippetUsers.snippets[0].snippetTitle}
            </Text>
            {snippetUsers.snippets.length > 0 && snippetUsers.snippets[0] && (
              <>
                <Text color="codex.text200" fontSize="xl" fontWeight="bold">
                  {snippetUsers.snippets[0].snippetTitle}
                </Text>
                {/* Other snippet rendering logic */}
              </>
            )}

            {
              <CodeEditor
              // code={snippetCode.length > 0 ? snippetCode.code : ""}
              // language={snippetCode.length > 0 ? snippetCode.language : ""}
              />
            }

            <Text color="codex.borders">
              {snippetUsers.snippets[0].snippetText}
            </Text>

            <Text fontSize="sm" color="codex.borders">
              Created by {snippetUsers.username} on{" "}
              {snippetUsers.snippets[0].formattedCreationDate}
            </Text>
            {/* if there is an edit date, display it */}
            {snippetUsers.snippets[0].formattedEditDate && (
              <Text fontSize="sm" color="codex.accents">
                Last edited on {snippetUsers.snippets[0].formattedEditDate}
              </Text>
            )}

            <VStack mt={4} align="start" spacing={2}>
              
              {/* Comment for the snippet */}
              {/* {snippetUsers.snippets[0].comments.length > 0 && (
                // display comments if there are any, if not, skip over
                <>
                  {snippetUsers.snippets[0].comments.map((comment) => (
                    <Box
                      key={comment._id}
                      borderWidth="1px"
                      p={2}
                      borderRadius="md"
                    >
                      <Text>{comment.username} said:</Text>
                      <Text>{comment.commentText}</Text>
                      <CodeEditor
                        code={
                          comment.commentCode.length > 0
                            ? comment.commentCode[0].code
                            : ""
                        }
                        language={
                          comment.commentCode.length > 0
                            ? comment.commentCode[0].language
                            : ""
                        }
                      />
                      <Text fontSize="sm" color="codex.accents">
                        Commented on {comment.formattedCreationDate}
                      </Text>
                    </Box>
                  ))}
                </>
              )} */}

              
              {/* add a button to drop (dislike) */}
              <Flex justifyContent="space-between" w="full">
                <HStack spacing={2}>
                  <Button variant="icon" size="sm">
                    <Icon as={FaAngleDoubleDown} w={8} h={8} mr="2" />
                  </Button>
                  <Text color="codex.highlights" fontSize="sm">
                    Props: {snippetUsers.snippets[0].overallProps}
                  </Text>
                  <Button variant="icon" size="sm">
                    <Icon as={FaAngleDoubleUp} w={8} h={8} mr="2" />
                  </Button>
                </HStack>
                <HStack spacing={2}>
                  <Button variant="icon" size="sm" onClick={handleCreateSnippet}>
                    <Icon as={BiEdit} w={6} h={8} mr="2" />
                  </Button>
                  <Button variant="icon" size="sm">
                    <Icon as={BiTrash} w={6} h={8} mr="2" />
                  </Button>
                </HStack>
              </Flex>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default Snippet;
