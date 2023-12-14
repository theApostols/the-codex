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
  IconButton
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail, MdMenu  } from "react-icons/md";
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

  return (
    <Box
      //bg="blue.100"
      // w="100vh" //commented this out to make header cover full width of page
      p="50px"
    >
      <Container maxW="container.xl">
        <Flex align="center">
          {/* this was the only way i could get the logo to show up, adjust as needed */}
          <Image
            src="/images/logo_dark.png"
            alt="LOGO"
            boxSize="100px"
          />
          <Text color='codex.accents' fontSize="xl" fontWeight="bold" ml={2}>
            The Codex
          </Text>
          <Spacer />
          <Box as="nav" display={{ base: 'none', md: 'block' }} >
          {navLinks.map(link => (
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
          <Box display={{ base: 'none', md: 'block' }}>
          <Button
            onClick={handleLoginClick}
            variant="primary"
            mr={4}
          >
            Log In
          </Button>
          <Button
            variant="secondary"
            onClick={handleSignUpClick}
          >
            Sign Up
          </Button>
          </Box>
          <Box display={{ base: 'block', md: 'none' }}>
          <Menu>
              <MenuButton as={IconButton} icon={<MdMenu />} color={theme.colors.codex.highlights} variant='ghost' />
              <MenuList>
                {navLinks.map(link => (
                  <MenuItem key={link.name} onClick={() => navigate(link.href)}>
                    {link.name}
                  </MenuItem>
                ))}
                <MenuItem onClick={handleLoginClick}>Log In</MenuItem>
                <MenuItem onClick={handleSignUpClick}>Sign Up</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;