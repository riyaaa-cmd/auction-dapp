import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  IconButton,
  Avatar,
  Text,
  Badge,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  HStack,
  Divider,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiSun, FiMoon, FiUser, FiLogOut, FiBell, FiSettings, FiPlus } from 'react-icons/fi';
// import { useWeb3React } from '@web3-react/core';

function Navigation() {
  // Temporary dummy state for wallet connection
  const [isConnected, setIsConnected] = useState(false);
  const [dummyAccount] = useState('0x1234...5678');
  const [notifications] = useState([
    { id: 1, message: 'New bid received on your auction', time: '2h ago' },
    { id: 2, message: 'Auction ending soon: "Rare NFT"', time: '5h ago' },
  ]);

  // Comment out real wallet connection
  // const { account, deactivate } = useWeb3React();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleCreateAuction = () => {
    // Temporary bypass
    navigate('/create');
    
    // Comment out real wallet check
    /*
    if (!account) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to create an auction',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      navigate('/connect');
      return;
    }
    navigate('/create');
    */
  };

  const handleProfile = () => {
    // Temporary bypass
    navigate('/profile');
    
    // Comment out real wallet check
    /*
    if (!account) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to view your profile',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      navigate('/connect');
      return;
    }
    navigate('/profile');
    */
  };

  const handleDisconnect = () => {
    // Temporary disconnect
    setIsConnected(false);
    navigate('/');
    
    // Comment out real disconnect
    /*
    deactivate();
    navigate('/');
    */
  };

  const handleConnect = () => {
    // Temporary connect
    setIsConnected(true);
    navigate('/');
    
    // Comment out real connect
    /*
    navigate('/connect');
    */
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={colorMode === 'dark' ? 'gray.800' : 'white'}
      boxShadow="sm"
      borderBottom="1px"
      borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={4}
        py={3}
        align="center"
        justify="space-between"
      >
        {/* Logo and Mobile Menu */}
        <Flex align="center">
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            icon={<FiMenu />}
            variant="ghost"
            onClick={onOpen}
            aria-label="Open menu"
          />
          <Link to="/">
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={colorMode === 'dark' ? 'white' : 'gray.800'}
              ml={{ base: 2, md: 0 }}
            >
              NFT Auction
            </Text>
          </Link>
        </Flex>

        {/* Desktop Navigation */}
        <Flex
          display={{ base: 'none', md: 'flex' }}
          align="center"
          gap={6}
        >
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link to="/auctions">
            <Button variant="ghost">Auctions</Button>
          </Link>
          <Link to="/my-auctions">
            <Button variant="ghost">My Auctions</Button>
          </Link>
          <Button variant="ghost" onClick={handleCreateAuction}>
            Create Auction
          </Button>
          <Button variant="ghost" onClick={handleProfile}>
            Profile
          </Button>
        </Flex>

        {/* Right Side Actions */}
        <Flex align="center" gap={4}>
          <IconButton
            icon={colorMode === 'dark' ? <FiSun /> : <FiMoon />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle color mode"
          />

          {isConnected ? (
            <>
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  leftIcon={<FiBell />}
                  position="relative"
                >
                  {notifications.length > 0 && (
                    <Badge
                      colorScheme="red"
                      position="absolute"
                      top="-1"
                      right="-1"
                      borderRadius="full"
                    >
                      {notifications.length}
                    </Badge>
                  )}
                </MenuButton>
                <MenuList>
                  {notifications.map((notification) => (
                    <MenuItem key={notification.id}>
                      <VStack align="start" spacing={1}>
                        <Text>{notification.message}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {notification.time}
                        </Text>
                      </VStack>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  leftIcon={<Avatar size="sm" />}
                >
                  <Text display={{ base: 'none', md: 'block' }}>
                    {isConnected ? formatAddress(dummyAccount) : 'Guest'}
                  </Text>
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FiUser />} onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem icon={<FiSettings />}>Settings</MenuItem>
                  {isConnected && (
                    <MenuItem icon={<FiLogOut />} onClick={handleDisconnect}>
                      Disconnect
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>

              <Tooltip label="Create New Auction">
                <IconButton
                  icon={<FiPlus />}
                  colorScheme="blue"
                  onClick={handleCreateAuction}
                  aria-label="Create auction"
                />
              </Tooltip>
            </>
          ) : (
            <Button colorScheme="blue" onClick={handleConnect}>
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Link to="/">
                <Button variant="ghost" width="full" justifyContent="flex-start">
                  Home
                </Button>
              </Link>
              <Link to="/auctions">
                <Button variant="ghost" width="full" justifyContent="flex-start">
                  Auctions
                </Button>
              </Link>
              <Link to="/my-auctions">
                <Button variant="ghost" width="full" justifyContent="flex-start">
                  My Auctions
                </Button>
              </Link>
              <Button
                variant="ghost"
                width="full"
                justifyContent="flex-start"
                leftIcon={<FiPlus />}
                onClick={handleCreateAuction}
              >
                Create Auction
              </Button>
              <Button
                variant="ghost"
                width="full"
                justifyContent="flex-start"
                leftIcon={<FiUser />}
                onClick={handleProfile}
              >
                Profile
              </Button>
              {isConnected && (
                <Button
                  variant="ghost"
                  width="full"
                  justifyContent="flex-start"
                  leftIcon={<FiLogOut />}
                  onClick={handleDisconnect}
                >
                  Disconnect
                </Button>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default Navigation; 