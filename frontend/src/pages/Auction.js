import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  VStack,
  HStack,
  Badge,
  useToast,
  useColorMode,
  Card,
  CardBody,
  CardFooter,
  Image,
  Progress,
} from '@chakra-ui/react';
// import { useWeb3React } from '@web3-react/core';
// import axios from 'axios';
// import { formatBalance, parseBalance } from '../utils/web3';
// import io from 'socket.io-client';

// const socket = io(process.env.REACT_APP_BACKEND_URL);

// Dummy data for testing
const dummyAuction = {
  id: 1,
  title: "Rare NFT Artwork",
  description: "A unique digital artwork by a famous artist",
  imageUrl: "https://picsum.photos/800/600",
  currentBid: "0.5",
  minimumBid: "0.1",
  endTime: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
  startTime: new Date().toISOString(),
  isActive: true,
  isSettled: false,
  creator: "0x123...abc",
  currentBidder: "0x456...def"
};

const Auction = () => {
  const { id } = useParams();
  // const { account, library } = useWeb3React();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState('');
  const [isBidding, setIsBidding] = useState(false);
  const { colorMode } = useColorMode();
  const toast = useToast();

  useEffect(() => {
    // Commented out real API call
    // const fetchAuction = async () => {
    //   try {
    //     const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auctions/${id}`);
    //     setAuction(response.data);
    //   } catch (error) {
    //     console.error('Error fetching auction:', error);
    //     toast({
    //       title: 'Error',
    //       description: 'Failed to fetch auction details',
    //       status: 'error',
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchAuction();

    // socket.on('auction:update', (updatedAuction) => {
    //   if (updatedAuction.id === id) {
    //     setAuction(updatedAuction);
    //   }
    // });

    // Using dummy data instead
    setAuction(dummyAuction);
    setLoading(false);

    // return () => {
    //   socket.off('auction:update');
    // };
  }, [id, toast]);

  const handleBid = async () => {
    // if (!account) {
    //   toast({
    //     title: 'Error',
    //     description: 'Please connect your wallet first',
    //     status: 'error',
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   return;
    // }

    if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= 0) {
      toast({
        title: 'Error',
        description: 'Please enter a valid bid amount',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsBidding(true);
    try {
      // Commented out real blockchain interaction
      // const bidAmountWei = parseBalance(bidAmount);
      // const contract = new ethers.Contract(auction.contractAddress, auctionABI, library.getSigner());
      // await contract.placeBid(auction.id, { value: bidAmountWei });

      // await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auctions/${id}/bid`, {
      //   bidder: account,
      //   amount: bidAmount,
      // });

      // Simulate successful bid
      toast({
        title: 'Success',
        description: 'Your bid has been placed successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setBidAmount('');
    } catch (error) {
      console.error('Error placing bid:', error);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsBidding(false);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Text>Loading auction details...</Text>
      </Box>
    );
  }

  if (!auction) {
    return (
      <Box textAlign="center" py={10}>
        <Text>Auction not found</Text>
      </Box>
    );
  }

  const timeLeft = new Date(auction.endTime) - new Date();
  const progress = Math.max(0, Math.min(100, (timeLeft / (auction.endTime - auction.startTime)) * 100));

  return (
    <Box>
      <Card bg={colorMode === 'dark' ? 'gray.700' : 'white'} boxShadow="md">
        <CardBody>
          <Image
            src={auction.imageUrl}
            alt={auction.title}
            borderRadius="lg"
            height="400px"
            objectFit="cover"
            width="100%"
          />
          <VStack align="start" spacing={4} mt={6}>
            <Heading size="lg">{auction.title}</Heading>
            <Text color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
              {auction.description}
            </Text>
            <HStack spacing={4}>
              <Badge colorScheme="green" fontSize="md">
                Current Bid: {auction.currentBid} ETH
              </Badge>
              <Badge colorScheme="blue" fontSize="md">
                Ends: {new Date(auction.endTime).toLocaleString()}
              </Badge>
            </HStack>
            <Box width="100%">
              <Text mb={2}>Time Remaining</Text>
              <Progress value={progress} size="sm" colorScheme="blue" />
            </Box>
          </VStack>
        </CardBody>
        <CardFooter>
          <VStack width="100%" spacing={4}>
            <HStack width="100%">
              <Input
                placeholder="Enter bid amount in ETH"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                type="number"
                step="0.01"
                min="0"
              />
              <Button
                colorScheme="blue"
                onClick={handleBid}
                isLoading={isBidding}
                loadingText="Placing Bid..."
              >
                Place Bid
              </Button>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              Minimum bid: {auction.minimumBid} ETH
            </Text>
          </VStack>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default Auction; 