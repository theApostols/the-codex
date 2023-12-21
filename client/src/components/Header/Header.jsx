import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import { BiLogOut, BiMenu, BiPlus, BiUser, BiCog } from "react-icons/bi";
import AuthService from "../../utils/auth";
import { ThemeContext } from "../../main.jsx";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";


const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const isAuthenticated = AuthService.loggedIn();
  const user = isAuthenticated ? AuthService.getProfile() : null;

  const handleCreateClick = () => {
    navigate("/createsnippet");
    onClose();
  };

  const handleProfileClick = () => {
    navigate(`/user-snippets/${user.data.username}`);
    onClose();
  };

  const handleSettingsClick = () => {
    navigate(`/user-settings/`);
    onClose();
  };

  const handleSignUpClick = () => {
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
          {/* Button to toggle dark or light mode */}
          <Button onClick={toggleTheme} variant="ghost">
                  {isDarkMode ? <BsFillSunFill w={8} h={8}/> : <BsMoonFill w={8} h={8}/>}
                </Button>

          <Image 
        src={isDarkMode ? "/images/logo_dark.png" : "/images/logo_light.png"} 
        alt="Logo" 
        boxSize="50px" 
      />

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
          <Image 
        src={isDarkMode ? "/images/logo_dark.png" : "/images/logo_light.png"} 
        alt="Logo" 
        boxSize="50px" 
      />
            <Text fontSize="xl" fontWeight="bold" ml="2" mr='6'>
              The Codex
            </Text>

                {/* Button to toggle dark or light mode */}
                <Button onClick={toggleTheme} variant="ghost">
                  {isDarkMode ? <BsFillSunFill w={8} h={8}/> : <BsMoonFill w={8} h={8}/>}
                </Button>
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
                onClick={handleCreateClick}
              >
                Create
              </Button>
              <Button
                leftIcon={
                  <Icon as={BiUser} w={8} h={8} color="codex.highlights" />
                }
                variant="ghost"
                justifyContent="start"
                onClick={handleProfileClick}
              >
                Profile
              </Button>
              <Button
                leftIcon={
                  <Icon as={BiCog} w={8} h={8} color="codex.highlights" />
                }
                variant="ghost"
                justifyContent="start"
                onClick={handleSettingsClick}
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
              onClick={() => {
                AuthService.logout();
                onClose();
              }}
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