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
import axios from 'axios';
import { useEffect, useState } from 'react';
import StarRating from './RatingStars';

// Take in book type and convert to BookViewType instead???
function BookView({ _id, lender, title, author, isbn, description, cover_image, distance }: IBookView) {
  const isAvailable = true;
  const [rating, setRating] = useState(0)

  const getRating = async () => {
    axios.get(`http://localhost:3000/reviews/${_id}`,
      { withCredentials: true })
      .then(response => {
        let avgRating = 0
        if (response.data) {
          avgRating = response.data.reduce((acc: number, review: any) => acc + review.rating, 0)
          avgRating /= Math.max(response.data.length, 1)
        }
        setRating(avgRating)
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getRating()
  }, [])


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
          <Box
            h={'200px'}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}>
            <Link as={ReactLink} to={`/book?id=${_id}`}>
            <Image
              src={cover_image}
              boxSize={'full'}
              objectFit='cover'
              alt='Book Image' />
            </Link>
            <HStack mt={0} position={'absolute'} top={6} left={6} rounded={'full'} 
              background={useColorModeValue('white', 'gray.700')} padding={2}>
              {!isAvailable && <WarningTwoIcon boxSize={5} color={'red.500'}/>}
              <StarRating rating={rating} />
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
            <HStack gap={3} background={useColorModeValue('gray.100', 'gray.600')} rounded={'2xl'} p={2} overflow={'hidden'}>
              <Link as={ReactLink} to={`/profile/${lender}`}>
                <Button 
                  rounded={'2xl'}
                  variant={'solid'}
                  background={useColorModeValue('gray.100', 'gray.600')}
                  fontFamily={'Poppins'}
                  color={'gray.900'}
                  size={'md'}>
                  <HStack>
                    <Avatar size={'sm'} mr={1} />
                    <Text fontWeight={'700'} fontSize={'xs'} fontFamily={'Poppins'}>{lender.slice(0, 12) + '...'}</Text>
                  </HStack>
                </Button>
              </Link>
            </HStack>
          </Flex>

      </Box>
    </Center>
  );
}

export default BookView;