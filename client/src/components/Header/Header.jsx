import React, { useState, useRef } from "react";
import {
  Flex,
  Text,
  Button,
  Stack,
  Image,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BiLogOut, BiMenu, BiPlus, BiUser, BiCog } from "react-icons/bi";

const Header = ({ isAuthenticated, user }) => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    // Navigate to the sign-up page
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const btnRef = useRef();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="1.5rem"
      color="codex.accents"
      boxShadow="md"
    >
      {isMobile ? (
        <>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Icon as={BiMenu} w={8} h={8} color="codex.text" />}
              variant="outline"
            />
            <MenuList bg="codex.main" border="1px solid teal">
              <MenuItem bg="transparent" color="codex.text">
                Home
              </MenuItem>
              <MenuItem bg="codex.main" color="codex.text">
                Snippets
              </MenuItem>
              <MenuItem bg="codex.main" color="codex.text">
                Button03
              </MenuItem>
              <MenuItem bg="codex.main" color="codex.text">
                Button04
              </MenuItem>
            </MenuList>
          </Menu>

          <Image src="/images/logo_dark.png" alt="Logo" boxSize="50px" />

          {isAuthenticated ? (
            <Avatar
              size="sm"
              src={user.avatar}
              ref={btnRef}
              onClick={onOpen}
              cursor="pointer"
            />
          ) : (
            <Button onClick={handleLoginClick} variant="outline">
              Login
            </Button>
          )}
        </>
      ) : (
        <>
          <Flex align="center">
            <Image src="/images/logo_dark.png" alt="Logo" boxSize="50px" />
            <Text fontSize="xl" fontWeight="bold" ml="2">
              The Codex
            </Text>
          </Flex>

          <Stack direction="row" spacing={4}>
            <Button variant="link">Home</Button>
            <Button variant="link">Snippets</Button>
            <Button variant="link">Button03</Button>
            <Button variant="link">Button04</Button>

            {isAuthenticated ? (
              <Avatar
                size="sm"
                src={user.avatar}
                ref={btnRef}
                onClick={onOpen}
                cursor="pointer"
              />
            ) : (
              <>
                <Button onClick={handleLoginClick} variant="outline">
                  Login
                </Button>
                <Button onClick={handleSignUpClick} variant="secondary">
                  Sign Up
                </Button>
              </>
            )}
          </Stack>
        </>
      )}

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="codex.darkest">
          <DrawerCloseButton />
          <DrawerHeader color="codex.accents">{user?.name}</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              <Button
                leftIcon={
                  <Icon as={BiPlus} w={8} h={8} color="codex.highlights" />
                }
                variant="ghost"
                justifyContent="start"
              >
                Create
              </Button>
              <Button
                leftIcon={
                  <Icon as={BiUser} w={8} h={8} color="codex.highlights" />
                }
                variant="ghost"
                justifyContent="start"
              >
                Profile
              </Button>
              <Button
                leftIcon={
                  <Icon as={BiCog} w={8} h={8} color="codex.highlights" />
                }
                variant="ghost"
                justifyContent="start"
              >
                User Settings
              </Button>
            </VStack>
            <Divider my="4" />
            <Button
              leftIcon={
                <Icon as={BiLogOut} w={8} h={8} color="codex.highlights" />
              }
              variant="ghost"
              justifyContent="start"
            >
              Logout
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Header;
