import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  useColorMode,
  Image,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../connectors';

function ConnectWallet() {
  const { activate, account } = useWeb3React();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const handleConnect = async () => {
    try {
      await activate(injected);
      navigate('/');
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      <VStack spacing={8} align="center">
        <Card bg={colorMode === 'dark' ? 'gray.700' : 'white'} width="full" maxW="600px">
          <CardBody>
            <VStack spacing={6} align="center">
              <Image
                src="https://picsum.photos/400/300"
                alt="Wallet Connection"
                borderRadius="lg"
                boxSize="200px"
                objectFit="cover"
              />
              <Heading size="lg">Connect Your Wallet</Heading>
              <Text textAlign="center" color="gray.500">
                To interact with the NFT Auction platform, you need to connect your wallet.
                This allows you to create auctions, place bids, and manage your NFTs.
              </Text>
              <Divider />
              <VStack spacing={4} width="full">
                <Button
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  onClick={handleConnect}
                  isDisabled={!!account}
                >
                  {account ? 'Wallet Connected' : 'Connect Wallet'}
                </Button>
                <Text fontSize="sm" color="gray.500">
                  We support MetaMask and other Web3 wallets
                </Text>
              </VStack>
            </VStack>
          </CardBody>
        </Card>

        <Card bg={colorMode === 'dark' ? 'gray.700' : 'white'} width="full" maxW="600px">
          <CardBody>
            <VStack spacing={4} align="start">
              <Heading size="md">Why Connect Your Wallet?</Heading>
              <HStack spacing={4} align="start">
                <Box flex={1}>
                  <Text fontWeight="bold">Create Auctions</Text>
                  <Text color="gray.500">
                    List your NFTs for auction and set your desired terms
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text fontWeight="bold">Place Bids</Text>
                  <Text color="gray.500">
                    Participate in auctions and bid on NFTs you want to own
                  </Text>
                </Box>
              </HStack>
              <HStack spacing={4} align="start">
                <Box flex={1}>
                  <Text fontWeight="bold">Manage NFTs</Text>
                  <Text color="gray.500">
                    View and manage your NFT collection and auction history
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text fontWeight="bold">Secure Transactions</Text>
                  <Text color="gray.500">
                    All transactions are secured through blockchain technology
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}

export default ConnectWallet; 