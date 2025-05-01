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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function MyAuctions() {
  const { colorMode } = useColorMode();

  // Mock data - replace with actual data from your smart contract
  const myAuctions = [
    {
      id: 1,
      title: 'My NFT #1',
      description: 'A unique digital artwork',
      imageUrl: 'https://picsum.photos/400/300',
      currentBid: '0.5 ETH',
      endTime: '2 days left',
      status: 'active',
    },
    {
      id: 2,
      title: 'My Collectible #2',
      description: 'Limited edition collectible',
      imageUrl: 'https://picsum.photos/400/300',
      currentBid: '1.2 ETH',
      endTime: '1 day left',
      status: 'active',
    },
  ];

  const myBids = [
    {
      id: 3,
      title: 'Bid on NFT #3',
      description: 'Another unique artwork',
      imageUrl: 'https://picsum.photos/400/300',
      myBid: '0.8 ETH',
      endTime: '3 days left',
      status: 'leading',
    },
  ];

  const AuctionCard = ({ auction }) => (
    <Card
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
            <Badge colorScheme={auction.status === 'active' ? 'green' : 'blue'}>
              {auction.status}
            </Badge>
            <Badge colorScheme="purple">{auction.endTime}</Badge>
          </HStack>
          <Text fontWeight="bold">
            {auction.currentBid ? `Current Bid: ${auction.currentBid}` : `My Bid: ${auction.myBid}`}
          </Text>
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
  );

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      <Heading mb={6}>My Auctions</Heading>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>My Created Auctions</Tab>
          <Tab>My Bids</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              gap={6}
            >
              {myAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              gap={6}
            >
              {myBids.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default MyAuctions; 