import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import CreateAuction from './pages/CreateAuction';
import AuctionDetail from './pages/AuctionDetail';
import Auctions from './pages/Auctions';
import MyAuctions from './pages/MyAuctions';
import Profile from './pages/Profile';
import ConnectWallet from './pages/ConnectWallet';

function App() {
  return (
    <ChakraProvider>
      <Box minH="100vh">
        <Navigation />
        <Box pt="60px">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateAuction />} />
            <Route path="/auctions" element={<Auctions />} />
            <Route path="/my-auctions" element={<MyAuctions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auction/:id" element={<AuctionDetail />} />
            <Route path="/connect" element={<ConnectWallet />} />
          </Routes>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App; 