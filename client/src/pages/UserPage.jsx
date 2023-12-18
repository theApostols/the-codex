import React from "react";
import Snippet from "../components/Snippet/Snippet";
import { GET_ALL_SNIPPETS } from "../utils/queries";

export default function UserPage() {
  const paragraphStyle = {
    fontSize: "18px", // Set the desired font size
    color: "white", // Set the text color to white
    fontWeight: "bold", // Make the text bold
  };
  return (
    <>
      <p style={paragraphStyle}>UserPage is rendering</p>
      <Snippet />
    </>
  );
}

// import { useQuery, useMutation } from "@apollo/client";
// import React from "react";
// import Snippet from "../components/Snippet/Snippet";
// // import { GET_ALL_USERS } from "../utils/queries";

// export default function UserPage() {
//   const paragraphStyle = {
//     fontSize: "18px",
//     color: "white",
//     fontWeight: "bold",
//   };

//   // Use the useQuery hook to execute the GET_ALL_USERS query
//   const { loading, error, data } = useQuery(GET_ALL_USERS);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   // Extract users from the data
//   const users = data.allUsers;

//   return (
//     <>
//       <p style={paragraphStyle}>UserPage is rendering</p>
//       {users.map((user) => (
//         <Snippet key={user.username} snippet={user} />
//       ))}
//     </>
//   );
// }
