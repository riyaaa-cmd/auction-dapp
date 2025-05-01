import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  useColorMode,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Auctions() {
  const { colorMode } = useColorMode();

  // Mock data - replace with actual data from your smart contract
  const auctions = [
    {
      id: 1,
      title: 'Rare NFT #1',
      description: 'A unique digital artwork',
      imageUrl: 'https://picsum.photos/400/300',
      currentBid: '0.5 ETH',
      endTime: '2 days left',
      category: 'Art',
    },
    {
      id: 2,
      title: 'Collectible #2',
      description: 'Limited edition collectible',
      imageUrl: 'https://picsum.photos/400/300',
      currentBid: '1.2 ETH',
      endTime: '1 day left',
      category: 'Collectibles',
    },
  ];

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      <Heading mb={6}>Active Auctions</Heading>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={6}
      >
        {auctions.map((auction) => (
          <Card
            key={auction.id}
            bg={colorMode === 'dark' ? 'gray.700' : 'white'}
            overflow="hidden"
            _hover={{ transform: 'translateY(-4px)', transition: 'all 0.2s' }}
          >
            <Image
              src={auction.imageUrl}
              alt={auction.title}
              height="200px"
              objectFit="cover"
            />
            <CardBody>
              <VStack align="start" spacing={3}>
                <Heading size="md">{auction.title}</Heading>
                <Text color="gray.500">{auction.description}</Text>
                <HStack>
                  <Badge colorScheme="blue">{auction.category}</Badge>
                  <Badge colorScheme="green">{auction.endTime}</Badge>
                </HStack>
                <Text fontWeight="bold">Current Bid: {auction.currentBid}</Text>
              </VStack>
            </CardBody>
            <CardFooter>
              <Button
                as={Link}
                to={`/auction/${auction.id}`}
                colorScheme="blue"
                width="full"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}

export default Auctions; 