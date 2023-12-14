import React from "react";
// import Snippet from "../components/Snippet/snippets.jsx"
// import UserInfo from "../components/UserInfo/userinfo.jsx"

// export default function UserPage() {
//   return (
//     <>
//       <p>Testing UserPage</p>
//       <Snippet />
//       <UserInfo />
//     </>
//   );
// }

export default function UserPage() {
  const paragraphStyle = {
    fontSize: "18px", // Set the desired font size
    color: "white", // Set the text color to white
    fontWeight: "bold", // Make the text bold
  };
  return (
    <>
      <p style={paragraphStyle}>UserPage is rendering</p>
    </>
  );
}
