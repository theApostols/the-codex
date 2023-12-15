import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <Box width="full" maxWidth="container.xl" px="4">
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
