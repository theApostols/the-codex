import {
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

// Added default value to the snippet renders on the userpage
const SnippetPreview = ({ snippet }) => {
  const navigate = useNavigate();

  const handleUsernameClick = () => {
    // Navigate to the sign-up page
    navigate(`/user-snippets/${snippet.username}`);
  };

  // Check if snippetData and snippetCode exist before accessing
  if (snippet) {
    const snippetData = snippet;

    return (
      <>
        <Box p={4} borderRadius="md">
          <Text fontSize="sm" color="codex.accents300" ml="1" mb="1">
            Created by{" "}
            <Box
              as="span"
              // color="codex.accents300"
              _hover = {{color: "codex.accents200"}}
              textDecoration="underline"
              cursor="pointer"
              onClick={handleUsernameClick}
            >
              {snippetData.username}
            </Box>{" "}
            on {snippetData.formattedCreationDate}
          </Text>
          <Link to={`/individual-snippets/${snippet._id}`}>
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
            </VStack>
          </Link>
        </Box>
      </>
    );
  } else {
    return null;
  }
};

export default SnippetPreview;
