import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Link,
  Image,
  Spacer,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  AvatarGroup,
  Collapse,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import theme from "../../utils/theme";

function Header() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    // Navigate to the sign-up page
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", href: "#!" },
    { name: "Snippets", href: "#!" },
    { name: "Button 3", href: "#!" },
    { name: "Button 4", href: "#!" },
  ];

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      //bg="blue.100"
      // w="100vh" //commented this out to make header cover full width of page
      p="50px"
    >
      <Container maxW="container.xl">
        <Flex align="center">
          {/* this was the only way i could get the logo to show up, adjust as needed */}
          <Image src="/images/logo_dark.png" alt="LOGO" boxSize="100px" />
          <Text color="codex.accents" fontSize="2xl" fontWeight="bold" ml={2}>
            The Codex
          </Text>
          <Spacer />

          {/* Navbar */}
          <Box as="nav" display={{ base: "none", md: "block" }}>
            {navLinks.map((link) => (
              <Link
                variant="link"
                href={link.href}
                p={2}
                key={link.name}
                fontSize="md"
                fontWeight="medium"
              >
                {link.name}
              </Link>
            ))}
          </Box>
          <Spacer />

          <AvatarGroup mr={4}>
            <Avatar
              size="lg"
              name="Jhon Doe"
              src="https://bit.ly/broken-link"
              bg="codex.highlights"
            />
          </AvatarGroup>
          <Box display={{ base: "none", md: "block" }}>
            <Button onClick={handleLoginClick} variant="outline" mr={4}>
              Log In
            </Button>
            <Button variant="secondary" onClick={handleSignUpClick}>
              Sign Up
            </Button>
          </Box>
          <Box display={{ base: "block", md: "none" }}>
            <>
              <Button variant='primary' onClick={onToggle} as={IconButton} icon={<MdMenu />} ></Button>
              <Collapse in={isOpen} animateOpacity>
                <Box
                  p="40px"
                  color="codex.main"
                  mt="4"
                  bg="teal.500"
                  rounded="md"
                  shadow="md"
                  display={{ base: "block", md: "block" }}
                >
                  <VStack spacing={4}>
                    {navLinks.map((link) => (
                      <Link
                        variant="link"
                        href={link.href}
                        p={2}
                        key={link.name}
                        fontSize="md"
                        fontWeight="medium"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <Button onClick={handleLoginClick} variant="outline" mr={4}>
                      Log In
                    </Button>
                    <Button variant="secondary" onClick={handleSignUpClick}>
                      Sign Up
                    </Button>
                  </VStack>
                </Box>
              </Collapse>
            </>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;