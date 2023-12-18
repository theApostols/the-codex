import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

//creating a new http link to the website's graphQL URI to act as the data endpoint
const graphQLLink = createHttpLink({ uri: "/graphql" });

//creating authorization middleware to attach the client's JWT to each of their requests
const authorizationLink = setContext((_, { headers }) => {
  //attempt to retrieve the JWT from local storage, then return it in the headers if it exists
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//set up a new apollo client instance using the above two links with an in-memory cache
const client = new ApolloClient({
  link: authorizationLink.concat(graphQLLink),
  cache: new InMemoryCache(),
});

//initialize our react application with an apollo provider defined as per the above client settings
function App() {
  return (
    <ApolloProvider client={client}>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="full" px="4">
            <Outlet />
          </Box>
        </Box>
        <Footer />
      </Box>
    </ApolloProvider>
  );
}

export default App;
