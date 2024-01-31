import {
  Box,
  Text,
  Button,
  VStack,
  Code,
  Icon,
  HStack,
  Flex,
  Divider,
} from "@chakra-ui/react";
import {
  BiBookmarkAltMinus,
  BiBookmarkAltPlus,
  BiEdit,
  BiTrash,
} from "react-icons/bi";
import CodeEditor from "../CodeEditor";
import { DELETE_COMMENT } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { GET_INDIVIDUAL_SNIPPET } from "../../utils/queries";
import React from "react";
import { useNavigate } from "react-router-dom";

// Added default value to the snippet renders on the userpage
const IndividualSnippetPreview = ({ snippet }) => {
  const navigate = useNavigate();

  const handleUsernameClick = () => {
    // Navigate to the sign-up page
    navigate(`/user-snippets/${snippet.username}`);
  };

  // Check if snippetData and snippetCode exist before accessing
  let currentUser; //variable to hold user's username

  //attempts to retrieve username from JWT
  try {
    //gets current user's username
    currentUser = Auth.getProfile().data.username;
  } catch (
    error //empty error block (this is just here to ensure the page still renders even if a user is not logged in)
  ) {}

  // Define your DELETE_COMMENT mutation
  const [deleteComment] = useMutation(DELETE_COMMENT);

  // Define the handleDeleteComment function
  const handleDeleteComment = async (commentId) => {
    try {
      const result = await deleteComment({
        variables: { commentId },
        update: (cache) => {
          // Update the cache to remove the deleted comment
          // Adjust this based on your cache structure
          const existingData = cache.readQuery({
            query: GET_INDIVIDUAL_SNIPPET,
            variables: { snippetId: snippet._id },
          });

          cache.writeQuery({
            query: GET_INDIVIDUAL_SNIPPET,
            variables: { snippetId: snippet._id },
            data: {
              oneSnippet: {
                ...existingData.oneSnippet,
                comments: existingData.oneSnippet.comments.filter(
                  (c) => c._id !== commentId
                ),
              },
            },
          });
        },
      });

      // Handle the result if needed
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Handle error if needed
    }
  };
  if (snippet && snippet.snippetCode && snippet.snippetCode.length > 0) {
    const snippetData = snippet;

    return (
      <Box p={4} borderRadius="md" cursor="default">
        <Text fontSize="sm" color="codex.accents300" ml="1" mb="1">
          Created by{" "}
          <Box
            as="span"
            // color="codex.accents300"
            _hover={{ color: "codex.accents200" }}
            textDecoration="underline"
            cursor="pointer"
            onClick={handleUsernameClick}
          >
            {snippetData.username}
          </Box>{" "}
           on {snippetData.formattedCreationDate}
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
          color="white"
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
              <React.Fragment key={index}>
                {codeBlock.language}
                <CodeEditor key={index} code={codeBlock.code} />
              </React.Fragment>
            ))}
          </Box>
          <Divider my={1} borderColor="codex.highlights" borderWidth="1px" />
          <Box w="full">
            {snippetData.comments.map((comment, index) => (
              <Box key={index} mb="8" borderRadius="md"
              border="1px"
              borderColor="codex.dark"
              bg="codex.dark"
              boxShadow="sm"
              p="4">
                <Text mb="2" color="codex.text200">{comment.commentText}</Text>
                <Text fontSize="sm" color="codex.accents300">
                  Posted by {comment.username} on{" "}
                  {comment.formattedCreationDate}
                </Text>
                {comment.formattedEditDate && (
                  <Text fontSize="sm" color="codex.accents">
                    Last edited on {comment.formattedEditDate}
                  </Text>
                )}

                {/* Render delete button for comments created by the logged-in user */}
                {currentUser === comment.username && (
                  <Button
                    mt="4"
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete Comment
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        </VStack>
      </Box>
    );
  } else {
    // Render nothing or a placeholder for when snippetData.snippetCode doesn't exist or is empty
    return null;
  }
};

export default IndividualSnippetPreview;
