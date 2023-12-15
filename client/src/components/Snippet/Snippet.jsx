import CodeEditor from "../CodeEditor";
import { Box, Text, Button, VStack, Code } from "@chakra-ui/react";
import theme from "../../utils/theme";

const Snippet = ({ snippet }) => {
  const {
    username,
    snippetTitle,
    snippetText,
    snippetCode,
    formattedCreationDate,
    formattedEditDate,
    overallProps,
    comments,
  } = snippet;

  return (
    <Box p={4} borderRadius="md" borderWidth="1px">
      <Text fontSize="xl" fontWeight="bold">
        {snippetTitle}
      </Text>
      <Text fontSize="sm" color="codex.accents">
        By {username} on {formattedCreationDate}
      </Text>
      {formattedEditDate && (
        <Text fontSize="sm" color="codex.accents">
          Last edited on {formattedEditDate}
        </Text>
      )}
      <Text>{snippetText}</Text>

      <CodeEditor
        code={snippetCode[0].code}
        language={snippetCode[0].language}
      />

      <VStack mt={4} align="start" spacing={2}>
        {comments.length > 0 && (
          // display comments if there are any, if not, skip over
          <>
            {comments.map((comment) => (
              <Box key={comment._id} borderWidth="1px" p={2} borderRadius="md">
                <Text>{comment.username} said:</Text>
                <Text>{comment.commentText}</Text>
                <CodeEditor
                  code={comment.commentCode[0].code}
                  language={comment.commentCode[0].language}
                />
                <Text fontSize="sm" color="codex.accents">
                  Commented on {comment.formattedCreationDate}
                </Text>
              </Box>
            ))}
          </>
        )}
        {/* add a button to drop (dislike) */}
        <Button variant="secondary" size="sm">
          Drop
        </Button>
        {/* display total props */}
        <Text fontSize="sm">Props: {overallProps}</Text>
        {/* add a button to prop */}
        <Button variant="outline" size="sm">
          Prop
        </Button>
      </VStack>
    </Box>
  );
};

export default Snippet;
