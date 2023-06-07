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
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ICheckout, IBook } from '../types';
import { CalendarIcon, CheckCircleIcon } from '@chakra-ui/icons';

function BookCheckout({ _id, book, checkout_date, due_date, return_date, returned, user }: ICheckout) {
  const [bookData, setBookData] = useState<IBook | null>(null)
  const toast = useToast()

  const getBookProps = async () => {
    axios.get(`http://localhost:3000/books/view/${book}`,
      { withCredentials: true })
      .then(response => {
        setBookData(response.data)
      })
      .catch(error => console.error(error))
  }

  const returnBook = () => {
    axios.post(`http://localhost:3000/checkout/return/${_id}`,
      {},
      { withCredentials: true })
      .then(response => {
        toast({
          title: 'Return Success!',
          description: "You've successfully returned a book, congrats! 🔥",
          status: 'success',
          duration: 7000,
          isClosable: true,
        })
      })
      .catch(error => {
        toast({
          title: 'Return Failed',
          description: "Something went wrong 😔",
          status: 'error',
          duration: 7000,
          isClosable: true,
      })})
  }

  useEffect(() => {
    getBookProps()
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
            <Link href={`/book?id=${bookData?._id}`}>
            <Image
              src={bookData?.cover_image}
              boxSize={'full'}
              objectFit='cover'
              alt='Book Image' />
            </Link>
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
              {due_date && <Text fontFamily={'Poppins'} ><CalendarIcon mx={2} />  Due | {new Date(due_date).toDateString()}</Text>}
            </Box>
            <HStack gap={3} background={useColorModeValue('gray.100', 'gray.600')} rounded={'2xl'} p={2} px={3} overflow={'hidden'} justifyContent={'space-between'}>
                <Button 
                  rounded={'2xl'}
                  variant={'solid'}
                  background={useColorModeValue('gray.100', 'gray.600')}
                  fontFamily={'Poppins'}
                  size={'md'}
                  w={'100%'}
                  color={'red.300'}
                  onClick={returnBook}>
                  <HStack justifyContent={'space-between'} w={'100%'}>
                    <Text>Return Book</Text>
                    <CheckCircleIcon />
                  </HStack>
                </Button>
            </HStack>
          </Flex>

      </Box>
    </Center>
  );
}

export default BookCheckout;