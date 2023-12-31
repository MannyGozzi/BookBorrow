import {
  Box,
  Center,
  Heading,
  Text,
  useColorModeValue,
  Image,
  HStack,
  Flex
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ICheckout, IBook } from '../types';
import { CalendarIcon } from '@chakra-ui/icons';

function BookBorrowed({ _id, book, checkout_date, due_date, return_date, returned, user }: ICheckout) {
  const [bookData, setBookData] = useState<IBook | null>(null)

  const getBookProps = async () => {
    axios.get(`http://localhost:3000/books/view/${book}`,
      { withCredentials: true })
      .then(response => {
        setBookData(response.data)
      })
      .catch(error => console.error(error))
  }


  useEffect(() => {
    getBookProps()
  }, [])


  return (
    <Center >
      <Box
        maxW={'445px'}
        h={'400px'}
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
            <Image
              src={bookData?.cover_image}
              boxSize={'full'}
              objectFit='cover'
              alt='Book Image' />
            <HStack mt={0} position={'absolute'} top={6} left={6} rounded={'full'} 
              background={useColorModeValue('white', 'gray.700')} padding={2} alignItems={'center'}>
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
                {bookData?.title}
              </Heading>
              <HStack className='content-center' mb={2}>
                <Text
                  color={'red.300'}
                  textTransform={'uppercase'}
                  fontWeight={800}
                  fontFamily={'Poppins'}
                  fontSize={'sm'}>
                  {bookData?.author}
                </Text>
                <Text
                  textTransform={'uppercase'}
                  fontWeight={400}
                  fontSize={'xs'}
                  letterSpacing={1.1}
                  key={bookData?.isbn}>
                  | {bookData?.isbn}
                </Text>
              </HStack>

              <Text
                color={'gray.500'}
                fontFamily={'body'}
                mb={4}>
                {bookData?.description?.slice(0, 85) + (bookData?.description && bookData.description.length > 85 ? '...' : '')}
              </Text>
              {!return_date && due_date && <Text fontFamily={'Poppins'} ><CalendarIcon mx={2} />  Due | {new Date(due_date).toDateString()}</Text>}
              {!return_date && !due_date && <Text fontFamily={'Poppins'} ><CalendarIcon mx={2} />  Pending Request</Text>}
              {return_date && <Text fontFamily={'Poppins'} ><CalendarIcon mx={2} />  Returned | {new Date(return_date).toDateString()}</Text>}
            </Box>
          </Flex>

      </Box>
    </Center>
  );
}

export default BookBorrowed;