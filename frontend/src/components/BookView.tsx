import {
  Box,
  Center,
  Heading,
  Text,
  Avatar,
  useColorModeValue,
  Image,
  HStack,
  Button,
  Flex,
  Spacer,
  Link,
  VStack,
  Stack
} from '@chakra-ui/react';
import { NavLink as ReactLink } from 'react-router-dom';
import { StarIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { BookViewType } from '../types.d';

// Take in book type and convert to BookViewType instead???
function BookView({ _id, lender, title, author, isbn, description, image, rating, distance }: BookViewType) {
  const isAvailable = true;
  return (
    <Center >
      <Box
        maxW={'445px'}
        h={'500px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'xl'}
        rounded={'xl'}
        p={6}
        overflow={'hidden'}>
        <Link as={ReactLink} to={`/${_id}`}>
          <Box
            h={'200px'}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}>
            <Image
              src={image}
              boxSize={'full'}
              objectFit='cover'
              alt='Book Image' />
            <HStack mt={0} position={'absolute'} top={3} left={3} rounded={'full'} 
            background={useColorModeValue('white', 'gray.700')} padding={2}>
              {!isAvailable && <WarningTwoIcon boxSize={5} color={'red.500'}/>}
              {[...Array(Math.floor(rating))].map((star, index) => <StarIcon boxSize={4} key={index} color={'red.300'} />)}
              {[...Array(5 - Math.floor(rating))].map((star, index) => <StarIcon boxSize={4} key={index + 5} color={'gray.300'} />)}
              <Text fontWeight={'bold'} fontSize={'sm'} m={0}>{distance} mi.</Text>
            </HStack>
          </Box>
          <Flex flexDir={'column'} h={'57%'} justifyContent={'space-between'}>
            <Box>
              <Heading
                color={useColorModeValue('gray.600', 'white')}
                fontSize={'xl'}
                fontFamily={'Poppins'}
                mt={0}
                mb={2}>
                {title}
              </Heading>
              <HStack className='content-center' mb={2}>
                <Text
                  color={'red.300'}
                  textTransform={'uppercase'}
                  fontWeight={800}
                  fontFamily={'Poppins'}
                  fontSize={'sm'}>
                  {author}
                </Text>
                <Text
                  textTransform={'uppercase'}
                  fontWeight={400}
                  fontSize={'xs'}
                  letterSpacing={1.1}>
                  | {isbn}
                </Text>
              </HStack>

              <Text
                color={'gray.500'}
                fontFamily={'body'}
                mb={4}>
                {description}
              </Text>
            </Box>
            <HStack gap={3} justifyContent={'space-around'} background={useColorModeValue('gray.100', 'gray.600')} rounded={'2xl'} p={2} overflow={'hidden'}>
              <Link as={ReactLink} to={`/${lender}`}>
                <Button 
                  rounded={'2xl'}
                  variant={'solid'}
                  background={useColorModeValue('gray.100', 'gray.600')}
                  fontFamily={'Poppins'}
                  color={'gray.900'}
                  size={'md'}>
                  <HStack justifyContent={'space-around'}>
                    <Avatar size={'sm'} mr={1} />
                    <Text fontWeight={'700'} fontSize={'sm'} fontFamily={'Poppins'}>@lender_name</Text>
                  </HStack>
                </Button>
              </Link>
              <Text fontSize={'lg'}>
                |
              </Text>
              <Link as={ReactLink} to={`/${_id}`}>
                <Button 
                  rounded={'2xl'}
                  variant={'solid'}
                  background={useColorModeValue('gray.100', 'gray.600')}
                  color={'red.300'}
                  fontFamily={'Poppins'}
                  size={'md'}>
                  View
                </Button>
              </Link>
            </HStack>
          </Flex>
        </Link>
      </Box>
    </Center>
  );
}

export default BookView;