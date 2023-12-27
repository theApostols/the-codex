import React, { useRef, useContext } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
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
  HStack,
  Heading
} from "@chakra-ui/react";
import { BiLogOut, BiMenu, BiPlus, BiUser, BiCog } from "react-icons/bi";
import AuthService from "../../utils/auth";
import { ThemeContext } from "../../main.jsx";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { GET_ONE_USER } from "../../utils/queries.js";

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const isAuthenticated = AuthService.loggedIn();
  const user = isAuthenticated ? AuthService.getProfile().data.username : null;

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_ONE_USER, {
    variables: { username: user },
  });

  console.log(user);
  console.log(userData);

  const handleCreateClick = () => {
    navigate("/createsnippet");
    onClose();
  };

  const handleProfileClick = () => {
    navigate(`/user-snippets/${user}`);
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
              {isAuthenticated ? (null) : 
              (
                <MenuItem bg="transparent" color="codex.text">
                Home
                </MenuItem>
              )}
              <MenuItem bg="codex.main" color="codex.text" as={Link} to="/main-snippets" variant="primary">
                Snippets
              </MenuItem>
              <MenuItem bg="codex.main" color="codex.text" as={Link} to="/dashboard">
                Dashboard
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
              src={`/images/file-uploads/${userData?.oneUser?.image}`}
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
              The CodeX
            </Text>

                {/* Button to toggle dark or light mode */}
                <Button onClick={toggleTheme} variant="ghost">
                  {isDarkMode ? <BsFillSunFill w={8} h={8}/> : <BsMoonFill w={8} h={8}/>}
                </Button>
          </Flex>

          <Stack direction="row" spacing={4}>
            {isAuthenticated ? (null) : 
            (
              <Button as={Link} to="/" variant="link">
              Home
              </Button>
            )}
            <Button as={Link} to="/main-snippets" variant="link">Snippets</Button>
            <Button as={Link} to="/dashboard" variant="link">Dashboard</Button>

            {isAuthenticated ? (
              <Avatar
                id="profile-image-avatar"
                src={`/images/file-uploads/${userData?.oneUser?.image}`}
                size="sm"
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
          <DrawerCloseButton color="codex.text200"/>
          <DrawerHeader color="codex.accents">{user?.name}</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              <HStack spacing = {4}>
                <Avatar
                  size="lg"
                  src={`/images/file-uploads/${userData?.oneUser?.image}`}
                />
                <Heading color="codex.accents" size = "lg" isTruncated>{user}</Heading>
              </HStack>
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