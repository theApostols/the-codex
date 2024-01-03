// import { Box, Text, Button, VStack, Code } from "@chakra-ui/react";

// // Added default value to the snippet renders on the userpage
// const SnippetPreview = (snippet) => {
//   const snippetData = snippet.snippet;
//   return (
//     <>
//       <Box p={4} borderRadius="md" borderWidth="1px">
//         <Text fontSize="xl" fontWeight="bold">
//           {snippetData.snippetTitle}
//         </Text>
//         <Text fontSize="sm" color="codex.accents">
//           Created by {snippetData.username} on{" "}
//           {snippetData.formattedCreationDate}
//         </Text>
//         {/* if there is an edit date, display it */}
//         {snippetData.formattedEditDate && (
//           <Text fontSize="sm" color="codex.accents">
//             Last edited on {snippetData.formattedEditDate}
//           </Text>
//         )}

//         <Text>{snippetData.snippetText}</Text>

//         <VStack mt={4} align="start" spacing={2}>
//           {/* add a button to drop (dislike) */}
//           <Button variant="secondary" size="sm">
//             Drop
//           </Button>
//           {/* display total props */}
//           <Text fontSize="sm">Props: {snippetData.overallProps}</Text>
//           {/* add a button to prop */}
//           <Button variant="outline" size="sm">
//             Prop
//           </Button>
//         </VStack>
//       </Box>
//     </>
//   );
// };

// export default SnippetPreview;
