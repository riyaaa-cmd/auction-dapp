import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Button,
  Card,
  CardBody,
  Input,
  useColorMode,
  Badge,
  Divider,
  Progress,
  useToast,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';

function AuctionDetail() {
  const { id } = useParams();
  // const { account } = useWeb3React();
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [bidAmount, setBidAmount] = useState('');
  const [isConnected] = useState(true); // Temporary wallet connection state

  // Mock data with state management
  const [auction, setAuction] = useState({
    id: id,
    title: 'Rare NFT #1',
    description: 'A unique digital artwork created by a renowned artist. This piece represents the intersection of traditional art and blockchain technology.',
    imageUrl: 'https://picsum.photos/400/300',
    currentBid: '0.5',
    minimumBid: '0.1',
    endTime: new Date(Date.now() + 86400000).toISOString(),
    startTime: new Date().toISOString(),
    isActive: true,
    isSettled: false,
    creator: '0x123...abc',
    currentBidder: '0x456...def',
    bids: [
      { bidder: '0x456...def', amount: '0.5', timestamp: '2 hours ago' },
      { bidder: '0x789...ghi', amount: '0.3', timestamp: '4 hours ago' },
    ],
  });

  const handlePlaceBid = () => {
    // if (!account) {
    if (!isConnected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to place a bid',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const bidValue = parseFloat(bidAmount);
    const currentBidValue = parseFloat(auction.currentBid);

    if (isNaN(bidValue) || bidValue <= currentBidValue) {
      toast({
        title: 'Invalid bid amount',
        description: 'Your bid must be higher than the current bid',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Update auction state
    setAuction(prevAuction => ({
      ...prevAuction,
      currentBid: bidAmount,
      currentBidder: '0x123...abc', // Your address
      bids: [
        {
          bidder: '0x123...abc',
          amount: bidAmount,
          timestamp: 'Just now'
        },
        ...prevAuction.bids
      ]
    }));

    // Clear bid input
    setBidAmount('');

    // Here you would call your smart contract to place the bid
    toast({
      title: 'Bid placed successfully',
      description: `You placed a bid of ${bidAmount} ETH`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const timeLeft = Math.max(0, new Date(auction.endTime) - new Date());
  const progress = (timeLeft / (new Date(auction.endTime) - new Date(auction.startTime))) * 100;

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      <VStack spacing={8} align="stretch">
        <Card bg={colorMode === 'dark' ? 'gray.700' : 'white'}>
          <CardBody>
            <HStack spacing={8} align="start">
              <Image
                src={auction.imageUrl}
                alt={auction.title}
                width="400px"
                objectFit="cover"
                borderRadius="lg"
              />
              <VStack align="start" spacing={4} flex={1}>
                <Heading size="lg">{auction.title}</Heading>
                <Text color="gray.500">{auction.description}</Text>
                <HStack>
                  <Badge colorScheme={auction.isActive ? 'green' : 'red'}>
                    {auction.isActive ? 'Active' : 'Ended'}
                  </Badge>
                  <Badge colorScheme="blue">NFT</Badge>
                </HStack>
                <Divider />
                <VStack align="start" spacing={2} width="full">
                  <Text fontWeight="bold">Current Bid: {auction.currentBid} ETH</Text>
                  <Text>Minimum Bid: {auction.minimumBid} ETH</Text>
                  <Text>Created by: {auction.creator}</Text>
                  <Text>Current highest bidder: {auction.currentBidder}</Text>
                </VStack>
                <Divider />
                <VStack align="start" spacing={2} width="full">
                  <Text>Time Remaining</Text>
                  <Progress value={progress} width="full" colorScheme="blue" />
                  <Text>{Math.floor(timeLeft / (1000 * 60 * 60))} hours remaining</Text>
                </VStack>
                <Divider />
                {auction.isActive && (
                  <VStack align="start" spacing={2} width="full">
                    <Text>Place a Bid</Text>
                    <HStack width="full">
                      <Input
                        type="number"
                        placeholder="Enter bid amount in ETH"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        min={parseFloat(auction.currentBid) + 0.1}
                        step="0.1"
                      />
                      <Button 
                        colorScheme="blue" 
                        onClick={handlePlaceBid}
                        isDisabled={!bidAmount || parseFloat(bidAmount) <= parseFloat(auction.currentBid)}
                      >
                        Place Bid
                      </Button>
                    </HStack>
                  </VStack>
                )}
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        <Card bg={colorMode === 'dark' ? 'gray.700' : 'white'}>
          <CardBody>
            <Heading size="md" mb={4}>Bid History</Heading>
            <VStack align="start" spacing={4}>
              {auction.bids.map((bid, index) => (
                <Box key={index} width="full">
                  <HStack justify="space-between">
                    <Text fontWeight="bold">{bid.bidder}</Text>
                    <Text>{bid.amount} ETH</Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.500">{bid.timestamp}</Text>
                  {index < auction.bids.length - 1 && <Divider />}
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}

export default AuctionDetail; 