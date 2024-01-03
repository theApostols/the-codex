import { useRouteError } from "react-router-dom";
import { Box, Text, Heading, VStack, Image } from "@chakra-ui/react";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box
      bg="codex.main"
      color="white"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={4}>
        <MdOutlineCheckBoxOutlineBlank size="5rem" color="#A5E9E1" />
        <Image
            src="/images/error.png"
            alt="Error"
            boxSize="400px"
          />
        <Heading as="h1" size="2xl" color="codex.highlights">
          Oops!
        </Heading>
        <Text fontSize="xl">Sorry, an unexpected error has occurred.</Text>
        <Text color="codex.accents">
          <i>{error.statusText || error.message}</i>
        </Text>
      </VStack>
    </Box>
  );
}