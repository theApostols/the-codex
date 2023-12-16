import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Stack,
  useBreakpointValue,
  Badge,
  Wrap,
  WrapItem,
  Image,
} from "@chakra-ui/react";
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

// animation variants
const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const aboutVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const snippetsVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

const howItWorksVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1 }
};

const languageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

// animation transition
const transition = {
  duration: 0.8,
  ease: 'easeInOut'
};

function HeroSection() {
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
      <Text color='gray' fontSize="xl" mb={5}>
        Join a community of passionate developers
      </Text>
      <Button size="lg" variant="secondary" mt={4}>
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
      <Text color='gray' fontSize="lg">
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
            <Text color="white">Variety of languages</Text>
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
            <Text color="white">Community interaction</Text>
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
            <Text color="white">Easy snippet sharing</Text>
          </VStack>
        </Stack>
  </VStack>
  </MotionBox>
  );
}

const LanguagesSection = () => (
  <MotionBox
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ ...transition, staggerChildren: 0.1 }}
    variants={languageVariants}
    p={10}
    m='5'
    textAlign="center"
  >
    <Heading color='codex.accents' mb={6}>Languages We Love</Heading>
    <Wrap color='gray' justify="center" spacing="30px">
      <WrapItem variants={languageVariants}><Badge p={4}>JavaScript</Badge></WrapItem>
      <WrapItem variants={languageVariants}><Badge p={4}>Python</Badge></WrapItem>
      <WrapItem variants={languageVariants}><Badge p={4}>Java</Badge></WrapItem>
    </Wrap>
  </MotionBox>
);

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
    <Box p={10}>
      <Heading color='codex.accents' mb={6}>Featured Snippets</Heading>
      <SimpleGrid color='gray' columns={3} spacing={10}>
        <SnippetCard title="React Components" category="Web Development" />
        <SnippetCard title="Unity Scripts" category="Game Development" />
        <SnippetCard
          title="Algorithm Implementations"
          category="Data Structures"
        />
      </SimpleGrid>
      <Button variant='secondary' mt={4}>
        View More Snippets
      </Button>
    </Box>
  </MotionBox>
  );
}

function HowItWorks() {
  return (
    <MotionBox
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={transition}
    variants={howItWorksVariants}
    p={10}
    m='5'
    textAlign="center"
  >
    <Box p={10}>
      <Heading color='codex.accents' mb={6}>How It Works</Heading>
      <Text color='gray' mb={3}>
        "This platform has transformed the way I manage my code snippets."
      </Text>
      <Text color='gray' mb={3}>
        "The community support is fantastic. I've learned so much!"
      </Text>
      <Button size="lg" variant='secondary' mt={4}>
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
