import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  useColorMode,
  IconButton,
  Container,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import WalletConnect from './WalletConnect';

const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box minH="100vh">
      <Box as="nav" bg={colorMode === 'dark' ? 'gray.900' : 'white'} px={4} py={4} boxShadow="sm">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
              <Heading size="md">Auction DApp</Heading>
            </Link>
            <Stack direction="row" spacing={4} align="center">
              <Link as={RouterLink} to="/create" _hover={{ textDecoration: 'none' }}>
                Create Auction
              </Link>
              <Link as={RouterLink} to="/profile" _hover={{ textDecoration: 'none' }}>
                Profile
              </Link>
              <WalletConnect />
              <IconButton
                icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                aria-label="Toggle color mode"
              />
            </Stack>
          </Flex>
        </Container>
      </Box>
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 