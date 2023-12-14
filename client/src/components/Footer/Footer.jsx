import { Box, Container, Stack, Text, Link, Heading, SimpleGrid, Icon, Image } from '@chakra-ui/react';
import { FaTwitter, FaInstagram, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="codex.darkest"
      color="codex.accents"
      py="10"
      px={{ base: "5", md: "10" }}
      mt="auto"
    >
      {/* Container is used to limit the width of the content inside it. */}
      <Container maxW="container.xl">
        {/* SimpleGrid is used to create a responsive grid layout. */}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
          {/* First column containing the logo and some text. */}
          <Box>
            <Image src="/images/logo_dark.png" alt="LOGO" boxSize="50px" />
            <Heading as="p" size="lg" fontWeight="bold">
              The CodeX
            </Heading>
            <Text mt="2" fontSize="sm">
              Created by The Apostols
            </Text>
          </Box>
          <Stack>
            <Heading as="p" size="md" fontWeight="bold">
              About Us
            </Heading>
            <Link
              href="https://github.com/WesleyHAS"
              fontSize="sm"
              variant="link"
            >
              Wesley Alcantara
            </Link>
          </Stack>
          <Stack>
            <Heading as="p" size="md" fontWeight="bold">
              Social Media
            </Heading>
            <Link href="#" fontSize="sm" variant="link">
              something else
            </Link>
          </Stack>
          <Stack>
            <Heading as="p" size="md" fontWeight="bold">
              License
            </Heading>
            <Link
              href="https://opensource.org/licenses/MIT"
              fontSize="sm"
              variant="link"
            >
              Licence
            </Link>
          </Stack>
        </SimpleGrid>

        {/* Footer bottom area with copyright notice and social media icons. */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="10"
          flexWrap="wrap"
          borderTop="1px solid #413C66"
        >
          <Text fontSize="sm">
            © {new Date().getFullYear()} The CodeX. All rights reserved.
          </Text>
          {/* Social media icons with links. */}
          <Stack
            direction="row"
            spacing={6}
            mt={{ base: "4", md: "0" }}
            pt="5px"
          >
            <Link href="#" isExternal>
              <Icon as={FaGithub} />
            </Link>
            {/* Additional social media icons... */}
            <Link href="mailto:theapostolsofveronica@outlook.com" isExternal>
              <FaEnvelope />
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
