import {
  Box,
  Center,
  Heading,
  Text,
  useColorModeValue,
  Image,
  HStack,
  Button,
  Flex,
  useToast,
  Avatar,
  FormControl,
  Input
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ICheckout, IBook } from '../types';
import { CheckCircleIcon } from '@chakra-ui/icons';
import ReactDOM from 'react-dom';

function BookConfirmCheckout({ _id, book, checkout_date, due_date, return_date, returned, user, lender }: ICheckout) {
  const [bookData, setBookData] = useState<IBook | null>(null)
  const [lenderData, setLenderData] = useState<any>(null)
  const [checkedOut, setCheckedOut] = useState<boolean>(false)
  const dueDate = useRef<Date | null>(null)
  const toast = useToast()

  const getBookProps = async () => {
    axios.get(`http://localhost:3000/books/view/${book}`,
      { withCredentials: true })
      .then(response => {
        setBookData(response.data)
      })
      .catch(error => console.error(error))
  }

  const getBorrowerProps = async () => {
    axios.get(`http://localhost:3000/users/${user}`,
      { withCredentials: true })
      .then(response => {
        setLenderData(response.data)
      })
      .catch(error => console.error(error))
  }

  const checkout = (approved: boolean) => {
    console.log('duedate', dueDate.current)
    if (!dueDate.current && approved) {
      return toast({
        title: 'Error',
        description: "Please select a due date!",
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
    }
    axios.post(`http://localhost:3000/checkout/confirm/${_id}`,
      { approved, due_date: dueDate.current },
      { withCredentials: true })
      .then(response => {
        if (approved) toast({
          title: 'Checkout Approved!',
          description: "You've successfully lended the book! 🔥",
          status: 'success',
          duration: 7000,
          isClosable: true,
        })
        else toast({
          title: 'Checkout Declined!',
          description: "You've successfully declined the request! 🔥",
          status: 'info',
          duration: 7000,
          isClosable: true,
        })
        setCheckedOut(true)
      })
      .catch(error => {
        console.error(error)
        toast({
          title: 'Error',
          description: "Something unexpected happened 😔",
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      })
  }

  useEffect(() => {
    getBookProps()
    getBorrowerProps()
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
            <HStack>
              <Avatar size={'sm'} />
              <Text
                color={'red.300'}
                textTransform={'uppercase'}
                fontWeight={800}
                fontFamily={'Poppins'}
                fontSize={'sm'}>
                {'@' + lenderData?.user.username}
              </Text>
            </HStack>
            <FormControl mt={4}>
              <Input rounded={'xl'} type='DATE' placeholder={Date().toString()} onChange={(event) => dueDate.current = event.target.valueAsDate} />
            </FormControl>
          </Box>
          <HStack gap={3} background={useColorModeValue('gray.100', 'gray.600')} rounded={'2xl'} p={2} px={3} overflow={'hidden'} justifyContent={'space-between'}>
            <Button
              rounded={'2xl'}
              variant={'solid'}
              background={useColorModeValue('gray.50', 'gray.600')}
              fontFamily={'Poppins'}
              size={'md'}
              w={'100%'}
              color={'green.300'}
              onClick={() => checkout(true)}
              isDisabled={checkedOut}>
              <HStack justifyContent={'space-between'} w={'100%'}>
                <Text>Confirm</Text>
                <CheckCircleIcon />
              </HStack>
            </Button>
            <Button
              rounded={'2xl'}
              variant={'solid'}
              background={useColorModeValue('gray.50', 'gray.600')}
              fontFamily={'Poppins'}
              size={'md'}
              w={'100%'}
              color={'red.300'}
              onClick={() => checkout(false)}
              isDisabled={checkedOut}>
              <HStack justifyContent={'space-between'} w={'100%'}>
                <Text>Decline</Text>
                <CheckCircleIcon />
              </HStack>
            </Button>
          </HStack>
        </Flex>

      </Box>
    </Center>
  );
}

export default BookConfirmCheckout;