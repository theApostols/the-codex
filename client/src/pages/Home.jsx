import React from "react";
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Stack,
  useBreakpointValue,
  Badge,
  Image,
} from "@chakra-ui/react";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { heroVariants, aboutVariants, snippetsVariants, howItWorksVariants, transition } from "../utils/animations";
import '../index.css'
import Auth from "../utils/auth";


const MotionBox = motion(Box);

function HeroSection() {
  const navigate = useNavigate();
  const isLoggedIn = Auth.loggedIn();

  const handleGetStartedClick = () => {
    // Navigate to main page if logged in, otherwise to the sign-up page
    isLoggedIn ? navigate("/main-snippets") : navigate("/signup");
  };

  // const handleSignUpClick = () => {
  //   // Navigate to the sign-up page
  //   navigate("/signup");
  // };

  return (
    <MotionBox
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
    transition={transition}
    variants={heroVariants}
    p={10}
    m='5'
    textAlign="center"
  >
    <Box p={10} textAlign="center">
      <Heading color='codex.accents' mb={4}>Explore and Share Cutting-Edge Code Snippets</Heading>
      <Text color='codex.text200' fontSize="xl" mb={5}>
        Join a community of passionate developers
      </Text>
      <Button size="lg" variant="secondary" mt={4} onClick={handleGetStartedClick}>
        Get Started
      </Button>
    </Box>
  </MotionBox>
  );
}

function AboutPlatform() {
  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <MotionBox
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
    transition={transition}
    variants={aboutVariants}
    p={10}
    m='5'
    textAlign="center"
  >
    <VStack spacing={8} p={{ base: 4, md: 10 }} align="center">
    <Box textAlign="center" maxWidth={{ base: "90%", md: "80%", lg: "70%" }}>
      <Heading color='codex.accents' mb={4}>A Hub for Developers to Share and Discover Code</Heading>
      <Text color='codex.text200' fontSize="lg">
        Explore the world of development with a platform designed for developers to share,
        enhance, and showcase their programming skills.
      </Text>
    </Box>
    <Stack direction={{ base: "column", md: "row" }} spacing={4} overflow="hidden" justify="center">
          <VStack spacing={2}>
            <Image 
              src="/images/home/code01.png"
              alt="Variety of languages" 
              borderRadius="md"
              boxShadow="xl"
              maxW="100%"
              h="auto"
              m='5'
            />
            <Heading color="codex.text">Variety of languages</Heading>
          </VStack>
          <VStack spacing={2}>
            <Image 
              src="/images/home/code02.png"
              alt="Community interaction" 
              borderRadius="md"
              boxShadow="xl"
              maxW="100%"
              h="auto"
              m='5'
            />
            <Heading color="codex.text">Community interaction</Heading>
          </VStack>
          <VStack spacing={2}>
            <Image 
              src="/images/home/code03.png"
              alt="Easy snippet sharing" 
              borderRadius="md"
              boxShadow="xl"
              maxW="100%"
              h="auto"
              m='5'
            />
            <Heading color="codex.text">Easy snippet sharing</Heading>
          </VStack>
        </Stack>
  </VStack>
  </MotionBox>
  );
}

// function to animate text

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax" style={{ width: '100%', height: '100%' }}>
      <motion.div className="scroller" style={{ x, width: '100%', height: '100%' }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

function LanguagesSection () {

  return (
    <Box color='codex.highlights'
    textAlign="center">
      <Heading color='codex.accents' p={10} m='5' mb={6} >Languages we Love</Heading>
      <ParallaxText baseVelocity={-5}>JavaScript CSS HTML</ParallaxText>
      <ParallaxText baseVelocity={5}>Python Java C# Ruby</ParallaxText>
    </Box>
  );
};


function SnippetCard({ title, category }) {
  return (
    <MotionBox
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    variants={snippetsVariants}
    p={10}
    m='5'
    textAlign="center"
  >
    <Box borderWidth="1px" rounded="lg" overflow="hidden" p={6}>
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Badge>{category}</Badge>
    </Box>
  </MotionBox>
  );
}

function FeaturedSnippets() {
  // Adjust grid columns based on the current breakpoint
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const navigate = useNavigate();

  const handleSnippetsClick = () => {
    // Navigate to the sign-up page
    navigate("/main-snippets");
  };

  return (
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      variants={snippetsVariants}
      p={10}
      m="5"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Box>
        <Heading color='codex.accents' mb={6}>Featured Snippets</Heading>
        <SimpleGrid color='codex.text200' columns={columns} spacing={10}>
          <SnippetCard title="React Components" category="Web Development" />
          <SnippetCard title="Unity Scripts" category="Game Development" />
          <SnippetCard
            title="Algorithm Implementations"
            category="Data Structures"
          />
        </SimpleGrid>
        <Button variant='secondary' mt={4} onClick={handleSnippetsClick}>
          View More Snippets
        </Button>
      </Box>
    </MotionBox>
  );
}

function HowItWorks() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    // Navigate to the sign-up page
    navigate("/signup");
  };
  
  return (
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={transition}
      variants={howItWorksVariants}
      p={10}
      m='5'
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Box p={10}>
        <Heading color='codex.accents' mb={6}>How It Works</Heading>
        <Text color='codex.text200' mb={3}>
          "This platform has transformed the way I manage my code snippets."
        </Text>
        <Text color='codex.text200' mb={3}>
          "The community support is fantastic. I've learned so much!"
        </Text>
        <Button size="lg" variant='secondary' mt={4} onClick={handleSignUpClick}>
          Start Sharing Today
        </Button>
      </Box>
    </MotionBox>
  );
}

function Home() {
  return (
    <>
      <HeroSection />
      <AboutPlatform />
      <LanguagesSection />
      <FeaturedSnippets />
      <HowItWorks />
    </>
  );
}

export default Home;