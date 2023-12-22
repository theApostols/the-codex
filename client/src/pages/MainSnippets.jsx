import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  VStack,
  Text,
  Button,
  Icon,
  HStack,
  Heading,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { GET_ALL_SNIPPETS } from "../utils/queries";
import MainSnippetPreview from "../components/Snippet/MainSnippetPreview.jsx";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import { ADD_PROPS, ADD_DROPS, REMOVE_PROPS, REMOVE_DROPS} from "../utils/mutations";
import Auth from "../utils/auth";

export default function UserSnippets() {
    //PROPS AND DROPS MUTATIONS
    const [addProps] = useMutation(ADD_PROPS);
    const [addDrops] = useMutation(ADD_DROPS);
    const [removeProps] = useMutation(REMOVE_PROPS);
    const [removeDrops] = useMutation(REMOVE_DROPS);

  const { loading, error, data } = useQuery(GET_ALL_SNIPPETS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const snippets = data.allSnippets;

  // GET USERNAME FROM TOKEN
  const username = Auth.getProfile().data.username;
  // console.log("this is the username:", username);


  //PROPS AND DROPS HANDLERS
  const handleAddProps = async (snippetId) => {
    try {
      // was getting undefined error, chatgpt suggested this fix
      const snippet = snippets.find((s) => s._id === snippetId);

      if (snippet.props.includes(username)) {
        throw new Error("You Already Prop'd This Snippet!");
      }
      await addProps({
        variables: {
          username: username,
          snippetId: snippetId,
        },
      });
    } catch (err) {
      console.error('Error propping snippet', err);
    }
  };

  const handleAddDrops = async (snippetId) => {
    try {
      const snippet = snippets.find((s) => s._id === snippetId);

      if (snippet.props.includes(username)) {
        throw new Error("You Already Dropped This Snippet!");
      }
      await addDrops({
        variables: {
          username: username,
          snippetId: snippetId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveProps = async (snippetId) => {
    try{
      await removeProps({
        variables: {
          username: username,
          snippetId: snippetId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveDrops = async (snippetId) => {
    try{
      await removeDrops({
        variables: {
          username: username,
          snippetId: snippetId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Box
        p="50"
        d="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          w="full"
          maxW="5xl"
          mx="auto"
          p="8"
          alignItems="start"
        >
          {/* Profile Section on the Left */}
          {/* <VStack spacing="4" align="center" mr={{ md: "8" }}>
          <Avatar src="/path-to-avatar-image.jpg" size="xl" />
          <Heading as="h3">Username</Heading>
        </VStack> */}
          <VStack
            spacing="4"
            w="full"
            maxW="5xl"
            mx="auto"
            p="8"
            color="codex.accents"
          >
            <Box
              w="full"
              border="1px solid"
              borderColor="codex.borders"
              borderRadius="lg"
              bg="codex.darkest"
            >
              {snippets.map((snippet, index) => (
                <Box
                  key={index}
                  pb="5"
                  w="full"
                  borderBottom="1px solid"
                  borderColor="codex.borders"
                >
                  <Link to={`/individual-snippets/${snippet._id}`}>
                    <MainSnippetPreview snippet={snippet} />
                  </Link>
                  <HStack color="codex.text">
                    <Button variant="icon" size="sm"
                    onClick={() => handleAddDrops(snippet._id) && handleRemoveProps(snippet._id)}
                    >
                      <Icon as={FaAngleDoubleDown} w={8} h={8} mr="2" />
                    </Button>
                    <Text color="codex.highlights" fontSize="sm">
                      Props: {snippet.overallProps}
                    </Text>
                    <Button variant="icon" size="sm"
                    onClick={() => handleAddProps(snippet._id) && handleRemoveDrops(snippet._id)}
                    >
                      <Icon as={FaAngleDoubleUp} w={8} h={8} mr="2" />
                    </Button>
                  </HStack>
                </Box>
              ))}
            </Box>
          </VStack>
        </Flex>
      </Box>
    </>
  );
}
