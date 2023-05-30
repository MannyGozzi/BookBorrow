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
  Link,
} from '@chakra-ui/react';
import { NavLink as ReactLink } from 'react-router-dom';
import { StarIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { IBookView } from '../types.d';

// Take in book type and convert to BookViewType instead???
function BookView({ _id, lender, title, author, isbn, description, cover_image, distance }: IBookView) {
  const rating = Math.random() * 5;
  const isAvailable = true;
  return (
    <Center >
      <Box
        maxW={'445px'}
        h={'450px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'xl'}
        rounded={'xl'}
        p={3}
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
              src={cover_image}
              boxSize={'full'}
              objectFit='cover'
              alt='Book Image' />
            <HStack mt={0} position={'absolute'} top={6} left={6} rounded={'full'} 
              background={useColorModeValue('white', 'gray.700')} padding={2}>
              {!isAvailable && <WarningTwoIcon boxSize={5} color={'red.500'}/>}
              {[...Array(Math.floor(rating))].map((star, index) => <StarIcon boxSize={4} key={index} color={'red.300'} />)}
              {[...Array(5 - Math.floor(rating))].map((star, index) => <StarIcon boxSize={4} key={index + 5} color={'gray.300'} />)}
              <Text fontWeight={'bold'} fontSize={'sm'} m={0}>{distance?.toFixed(1)} mi.</Text>
            </HStack>
          </Box>
          <Flex flexDir={'column'} h={'53%'} justifyContent={'space-between'}>
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
                  letterSpacing={1.1}
                  key={isbn}>
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
                    <Text fontWeight={'700'} fontSize={'xs'} fontFamily={'Poppins'}>{lender.slice(0, 12) + '...'}</Text>
                  </HStack>
                </Button>
              </Link>
              <Text fontSize={'lg'}>
                |
              </Text>
              <Link as={ReactLink} to={`/books/${_id}`}>
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