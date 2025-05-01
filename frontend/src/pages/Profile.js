import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Button,
  Divider,
  useColorMode,
  Card,
  CardBody,
  Heading,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
// import { useWeb3React } from '@web3-react/core';

function Profile() {
  // Temporary state for wallet connection
  const [isConnected] = useState(true);
  const [dummyAccount] = useState('0x1234...5678');
  const { colorMode } = useColorMode();

  const formatAddress = (address) => {
    if (!address) return 'Guest';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      <Card bg={colorMode === 'dark' ? 'gray.700' : 'white'} mb={6}>
        <CardBody>
          <VStack spacing={4} align="start">
            <HStack spacing={4}>
              <Avatar size="xl" name={dummyAccount} />
              <VStack align="start">
                <Heading size="md">User Profile</Heading>
                <Text color="gray.500">{formatAddress(dummyAccount)}</Text>
                {isConnected && <Badge colorScheme="blue">Connected</Badge>}
              </VStack>
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      <Tabs variant="enclosed">
        <TabList>
          <Tab>Account Settings</Tab>
          <Tab>Preferences</Tab>
          <Tab>Activity</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Card bg={colorMode === 'dark' ? 'gray.700' : 'white'}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Display Name</FormLabel>
                    <Input placeholder="Enter your display name" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="Enter your email" />
                  </FormControl>
                  <Button colorScheme="blue">Save Changes</Button>
                </VStack>
              </CardBody>
            </Card>
          </TabPanel>

          <TabPanel>
            <Card bg={colorMode === 'dark' ? 'gray.700' : 'white'}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel>Theme</FormLabel>
                    <Select placeholder="Select theme">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Notifications</FormLabel>
                    <Select placeholder="Select notification preferences">
                      <option value="all">All</option>
                      <option value="important">Important Only</option>
                      <option value="none">None</option>
                    </Select>
                  </FormControl>
                  <Button colorScheme="blue">Save Preferences</Button>
                </VStack>
              </CardBody>
            </Card>
          </TabPanel>

          <TabPanel>
            <Card bg={colorMode === 'dark' ? 'gray.700' : 'white'}>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Text>Recent Activity</Text>
                  <Divider />
                  <Text color="gray.500">No recent activity</Text>
                </VStack>
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Profile; 