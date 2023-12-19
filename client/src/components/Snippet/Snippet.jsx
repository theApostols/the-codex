import CodeEditor from "../CodeEditor";
import { Box, Text, Button, VStack, Code } from "@chakra-ui/react";
import theme from "../../utils/theme";

// Added default value to the snippet renders on the userpage
const Snippet = (snippet) => {
  const snippetUsers = snippet.snippet;
  // console.log(snippetUsers);
  // console.log(
  //   "This is the snippet title =",
  //   snippetUsers.snippets[0].snippetTitle
  // );
  return (
    <><p>Hello, World!</p></>
    // <>
    //   <Box p={4} borderRadius="md" borderWidth="1px">
    //     <Text fontSize="xl" fontWeight="bold">
    //       {snippetUsers.snippets[0].snippetTitle}
    //     </Text>
    //     {snippetUsers.snippets.length > 0 && snippetUsers.snippets[0] && (
    //       <>
    //         <Text fontSize="xl" fontWeight="bold">
    //           {snippetUsers.snippets[0].snippetTitle}
    //         </Text>
    //         {/* Other snippet rendering logic */}
    //       </>
    //     )}
    //     <Text fontSize="sm" color="codex.accents">
    //       Created by {snippetUsers.username} on{" "}
    //       {snippetUsers.snippets[0].formattedCreationDate}
    //     </Text>
    //     {/* if there is an edit date, display it */}
    //     {snippetUsers.snippets[0].formattedEditDate && (
    //       <Text fontSize="sm" color="codex.accents">
    //         Last edited on {snippetUsers.snippets[0].formattedEditDate}
    //       </Text>
    //     )}

    //     <Text>{snippetUsers.snippets[0].snippetText}</Text>

    //     {
    //       <CodeEditor
    //       // code={snippetCode.length > 0 ? snippetCode.code : ""}
    //       // language={snippetCode.length > 0 ? snippetCode.language : ""}
    //       />
    //     }

    //     <VStack mt={4} align="start" spacing={2}>
    //       {snippetUsers.snippets[0].comments.length > 0 && (
    //         // display comments if there are any, if not, skip over
    //         <>
    //           {snippetUsers.snippets[0].comments.map((comment) => (
    //             <Box
    //               key={comment._id}
    //               borderWidth="1px"
    //               p={2}
    //               borderRadius="md"
    //             >
    //               <Text>{comment.username} said:</Text>
    //               <Text>{comment.commentText}</Text>
    //               <CodeEditor
    //                 code={
    //                   comment.commentCode.length > 0
    //                     ? comment.commentCode[0].code
    //                     : ""
    //                 }
    //                 language={
    //                   comment.commentCode.length > 0
    //                     ? comment.commentCode[0].language
    //                     : ""
    //                 }
    //               />
    //               <Text fontSize="sm" color="codex.accents">
    //                 Commented on {comment.formattedCreationDate}
    //               </Text>
    //             </Box>
    //           ))}
    //         </>
    //       )}
    //       {/* add a button to drop (dislike) */}
    //       <Button variant="secondary" size="sm">
    //         Drop
    //       </Button>
    //       {/* display total props */}
    //       <Text fontSize="sm">
    //         Props: {snippetUsers.snippets[0].overallProps}
    //       </Text>
    //       {/* add a button to prop */}
    //       <Button variant="outline" size="sm">
    //         Prop
    //       </Button>
    //     </VStack>
    //   </Box>
    // </>
  );
};

export default Snippet;
