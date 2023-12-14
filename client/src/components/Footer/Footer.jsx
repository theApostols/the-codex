import React from "react";
import { Box, Container, Text, Icon, Link, Tooltip } from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";


export default function Footer() {
  return (
    <Box
      as="footer"
      // bg="blue.100"
      p="4"
      mt="auto" // sticks footer to bottom of page
      color="blue.700"
      display="flex"
      flexDirection="column"
    >
      <Container maxW="container.xl" textAlign="center" flex="1" color='codex.highlights'>
        <Text fontSize={["xl"]} fontWeight="bold" ml={2}>
          {/* Responsive font size */}
          Created by The Apostols
        </Text>
        <Text mt="2">
          © {new Date().getFullYear()} The CodeX. All rights reserved.
        </Text>
        <Box>
          <Tooltip label="Email Us">
            <Link href="mailto:theapostolsofveronica@outlook.com" isExternal>
              <Icon as={MdOutlineEmail} boxSize={8} />
            </Link>
          </Tooltip>
        </Box>                    
      </Container>
    </Box>
  );
};

