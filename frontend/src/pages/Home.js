import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Image,
  VStack,
  HStack,
  Icon,
  useColorMode,
  Badge,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Grid,
  GridItem,
  useToast,
} from '@chakra-ui/react';
import { FiTrendingUp, FiAward, FiUsers, FiDollarSign } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Home() {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [isConnected] = useState(true); // Temporary wallet connection state

  // Static featured auctions data with state management
  const [featuredAuctions, setFeaturedAuctions] = useState([
    {
      id: 1,
      title: 'Rare Digital Art #001',
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
      currentBid: '2.5 ETH',
      timeLeft: '2h 30m',
      category: 'Art',
      minimumBid: '0.1 ETH',
    },
    {
      id: 2,
      title: 'Vintage Camera Collection',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      currentBid: '1.8 ETH',
      timeLeft: '5h 15m',
      category: 'Collectibles',
      minimumBid: '0.2 ETH',
    },
    {
      id: 3,
      title: 'Limited Edition Sneakers',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      currentBid: '0.8 ETH',
      timeLeft: '1h 45m',
      category: 'Fashion',
      minimumBid: '0.1 ETH',
    },
  ]);

  // Categories data
  const categories = [
    { name: 'Art', icon: '🎨', count: 156 },
    { name: 'Collectibles', icon: '🏺', count: 89 },
    { name: 'Music', icon: '🎵', count: 45 },
    { name: 'Photography', icon: '📷', count: 67 },
    { name: 'Sports', icon: '⚽', count: 112 },
    { name: 'Trading Cards', icon: '🃏', count: 78 },
  ];

  const handlePlaceBid = (auctionId) => {
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

    // Find the auction and update its current bid
    setFeaturedAuctions(prevAuctions => 
      prevAuctions.map(auction => {
        if (auction.id === auctionId) {
          const currentBidValue = parseFloat(auction.currentBid);
          const newBidValue = currentBidValue + 0.1;
          return {
            ...auction,
            currentBid: `${newBidValue.toFixed(1)} ETH`
          };
        }
        return auction;
      })
    );

    toast({
      title: 'Bid placed successfully',
      description: 'Your bid has been placed and is now the highest bid',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bg={colorMode === 'dark' ? 'gray.800' : 'blue.50'}
        py={20}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="1200px">
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8} alignItems="center">
            <GridItem>
              <VStack align="start" spacing={6}>
                <Heading
                  size="2xl"
                  bgGradient="linear(to-r, blue.400, purple.500)"
                  bgClip="text"
                  fontWeight="extrabold"
                >
                  Discover & Bid on Unique Digital Assets
                </Heading>
                <Text fontSize="xl" color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
                  Join the world's largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs).
                </Text>
                <HStack spacing={4}>
                  <Button size="lg" colorScheme="blue" as={Link} to="/auctions">
                    Explore Auctions
                  </Button>
                  <Button size="lg" variant="outline" as={Link} to="/create">
                    Create Auction
                  </Button>
                </HStack>
              </VStack>
            </GridItem>
            <GridItem display={{ base: 'none', md: 'block' }}>
              <Image
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0"
                alt="NFT Marketplace"
                borderRadius="lg"
                boxShadow="2xl"
              />
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxW="1200px" py={16}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
          <Stat>
            <StatLabel>Total Volume</StatLabel>
            <StatNumber>2,450 ETH</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Active Auctions</StatLabel>
            <StatNumber>547</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              12.5%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Total Users</StatLabel>
            <StatNumber>12,890</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              8.2%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Success Rate</StatLabel>
            <StatNumber>98.5%</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              1.2%
            </StatHelpText>
          </Stat>
        </SimpleGrid>
      </Container>

      {/* Featured Auctions */}
      <Box bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'} py={16}>
        <Container maxW="1200px">
          <VStack spacing={8} align="stretch">
            <Flex justify="space-between" align="center">
              <Heading size="xl">Featured Auctions</Heading>
              <Button variant="ghost" colorScheme="blue" as={Link} to="/auctions">
                View All
              </Button>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {featuredAuctions.map((auction) => (
                <Card key={auction.id} overflow="hidden">
                  <Image
                    src={auction.image}
                    alt={auction.title}
                    height="200px"
                    objectFit="cover"
                  />
                  <CardBody>
                    <VStack align="start" spacing={2}>
                      <Badge colorScheme="blue">{auction.category}</Badge>
                      <Heading size="md">{auction.title}</Heading>
                      <HStack>
                        <Icon as={FiDollarSign} />
                        <Text>Current Bid: {auction.currentBid}</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiTrendingUp} />
                        <Text>Min. Bid: {auction.minimumBid}</Text>
                      </HStack>
                      <HStack>
                        <Icon as={FiAward} />
                        <Text>{auction.timeLeft} left</Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                  <CardFooter>
                    <Button 
                      colorScheme="blue" 
                      width="full"
                      onClick={() => handlePlaceBid(auction.id)}
                    >
                      Place Bid
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Categories */}
      <Container maxW="1200px" py={16}>
        <VStack spacing={8} align="stretch">
          <Heading size="xl" textAlign="center">
            Popular Categories
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={6}>
            {categories.map((category) => (
              <Card
                key={category.name}
                p={4}
                textAlign="center"
                cursor="pointer"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                <Text fontSize="4xl" mb={2}>
                  {category.icon}
                </Text>
                <Text fontWeight="bold">{category.name}</Text>
                <Text color="gray.500">{category.count} items</Text>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Box
        bg={colorMode === 'dark' ? 'gray.800' : 'blue.50'}
        py={16}
        textAlign="center"
      >
        <Container maxW="1200px">
          <VStack spacing={6}>
            <Heading size="xl">Ready to Start Your Auction?</Heading>
            <Text fontSize="xl" color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
              Create your first auction in minutes and start selling your digital assets.
            </Text>
            <Button size="lg" colorScheme="blue" as={Link} to="/create">
              Create Auction
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   Heading,
//   Text,
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   Image,
//   Badge,
//   useColorMode,
// } from '@chakra-ui/react';
// import { Link as RouterLink } from 'react-router-dom';
// // import axios from 'axios';

// // Dummy data for testing
// const dummyAuctions = [
//   {
//     id: 1,
//     title: "Rare NFT Artwork",
//     description: "A unique digital artwork by a famous artist",
//     imageUrl: "https://picsum.photos/400/300",
//     currentBid: "0.5",
//     minimumBid: "0.1",
//     endTime: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
//     startTime: new Date().toISOString(),
//     isActive: true,
//     isSettled: false,
//     creator: "0x123...abc",
//     currentBidder: "0x456...def"
//   },
//   {
//     id: 2,
//     title: "Vintage Watch",
//     description: "A rare vintage watch from the 1950s",
//     imageUrl: "https://picsum.photos/400/300",
//     currentBid: "1.2",
//     minimumBid: "0.5",
//     endTime: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
//     startTime: new Date().toISOString(),
//     isActive: true,
//     isSettled: false,
//     creator: "0x789...ghi",
//     currentBidder: "0x012...jkl"
//   }
// ];

// const Home = () => {
//   const [auctions, setAuctions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { colorMode } = useColorMode();

//   useEffect(() => {
//     // Commented out real API call
//     // const fetchAuctions = async () => {
//     //   try {
//     //     const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auctions`);
//     //     setAuctions(response.data);
//     //   } catch (error) {
//     //     console.error('Error fetching auctions:', error);
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };

//     // fetchAuctions();

//     // Using dummy data instead
//     setAuctions(dummyAuctions);
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return (
//       <Box textAlign="center" py={10}>
//         <Text>Loading auctions...</Text>
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       <Heading mb={8}>Active Auctions</Heading>
//       <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
//         {auctions.map((auction) => (
//           <Card
//             key={auction.id}
//             bg={colorMode === 'dark' ? 'gray.700' : 'white'}
//             boxShadow="md"
//             _hover={{ boxShadow: 'lg' }}
//             transition="all 0.2s"
//           >
//             <CardBody>
//               <Image
//                 src={auction.imageUrl}
//                 alt={auction.title}
//                 borderRadius="lg"
//                 height="200px"
//                 objectFit="cover"
//                 width="100%"
//               />
//               <Heading size="md" mt={4}>
//                 {auction.title}
//               </Heading>
//               <Text mt={2} color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
//                 {auction.description}
//               </Text>
//               <Box mt={4}>
//                 <Badge colorScheme="green" mr={2}>
//                   Current Bid: {auction.currentBid} ETH
//                 </Badge>
//                 <Badge colorScheme="blue">
//                   Ends: {new Date(auction.endTime).toLocaleDateString()}
//                 </Badge>
//               </Box>
//             </CardBody>
//             <CardFooter>
//               <Button
//                 as={RouterLink}
//                 to={`/auction/${auction.id}`}
//                 colorScheme="blue"
//                 width="100%"
//               >
//                 View Auction
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </Grid>
//       {auctions.length === 0 && (
//         <Box textAlign="center" py={10}>
//           <Text>No active auctions found.</Text>
//           <Button
//             as={RouterLink}
//             to="/create"
//             colorScheme="blue"
//             mt={4}
//           >
//             Create an Auction
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Home; 