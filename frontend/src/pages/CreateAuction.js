import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Card,
  CardBody,
  CardFooter,
  useColorMode,
  HStack,
  Text,
  Select,
  Image,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiImage, FiClock, FiDollarSign } from 'react-icons/fi';

function CreateAuction() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [minimumBid, setMinimumBid] = useState('0.1');
  const [duration, setDuration] = useState(7);
  const [category, setCategory] = useState('art');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode } = useColorMode();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload the image to a storage service
      // For now, we'll use a dummy image URL
      setImageUrl('https://picsum.photos/800/600');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate successful auction creation
      toast({
        title: 'Success',
        description: 'Auction created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/');
    } catch (error) {
      console.error('Error creating auction:', error);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box maxW="800px" mx="auto" p={6}>
      <Card bg={colorMode === 'dark' ? 'gray.700' : 'white'} boxShadow="lg" borderRadius="xl">
        <CardBody>
          <Heading size="lg" mb={6} color={colorMode === 'dark' ? 'white' : 'gray.800'}>
            Create New Auction
          </Heading>
          
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              {/* Image Upload Section */}
              <FormControl>
                <FormLabel>Auction Image</FormLabel>
                <Box
                  border="2px dashed"
                  borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                  borderRadius="lg"
                  p={4}
                  textAlign="center"
                  position="relative"
                  minH="200px"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt="Auction preview"
                      objectFit="cover"
                      borderRadius="md"
                      w="100%"
                      h="200px"
                    />
                  ) : (
                    <VStack spacing={4}>
                      <FiImage size={48} color={colorMode === 'dark' ? 'white' : 'gray.400'} />
                      <Text>Upload an image for your auction</Text>
                    </VStack>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    opacity="0"
                    cursor="pointer"
                  />
                </Box>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter auction title"
                  size="lg"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter auction description"
                  size="lg"
                  minH="150px"
                />
              </FormControl>

              <HStack spacing={4} width="100%">
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    size="lg"
                  >
                    <option value="art">Art</option>
                    <option value="collectibles">Collectibles</option>
                    <option value="music">Music</option>
                    <option value="photography">Photography</option>
                    <option value="sports">Sports</option>
                    <option value="trading-cards">Trading Cards</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Minimum Bid (ETH)</FormLabel>
                  <NumberInput
                    value={minimumBid}
                    onChange={(value) => setMinimumBid(value)}
                    min={0.01}
                    step={0.01}
                    size="lg"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Duration (days)</FormLabel>
                  <NumberInput
                    value={duration}
                    onChange={(value) => setDuration(value)}
                    min={1}
                    max={30}
                    size="lg"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </HStack>
            </VStack>
          </form>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
            isLoading={isSubmitting}
            loadingText="Creating..."
            onClick={handleSubmit}
          >
            Create Auction
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}

export default CreateAuction; 