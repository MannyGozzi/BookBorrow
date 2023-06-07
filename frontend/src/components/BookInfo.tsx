import {
  Box,
  HStack,
  VStack,
  Text,
  Image,
  Center,
  Avatar,
  Flex,
  Spacer,
  Link,
  Button,
  Stack,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
// import StarRating from './RatingStars'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IBook, ICheckout } from '../types';
import { NavLink as ReactLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function BookInfo({_id, cover_image, title, author, description, lender, available} : IBook) {
  const user = useSelector((state: any) => state.user)
  const [lenderName, setLenderName] = useState('...')
  const [checkoutInfo, setCheckoutInfo] = useState<ICheckout | null>()
  const toast = useToast()
  const requestAvailable = useRef(available)

  const checkout = () => {
    const info = { userId: user, lender, bookId: _id }
    axios.post(`http://localhost:3000/checkout/${_id}`,
      info,
      { withCredentials: true })
      .then(response => {
        toast({
          title: 'Checkout Success!',
          description: "You've successfully requested a book, congrats! 🔥",
          status: 'success',
          duration: 7000,
          isClosable: true,
        })
        requestAvailable.current = false
        setCheckoutInfo(response.data)
      })
      .catch(error => {
        toast({
          title: 'Checkout Failed',
          description: "Book is already checked out or requested by you 😔",
          status: 'error',
          duration: 7000,
          isClosable: true,
        })})
  }

  const getCheckoutInfo = async () => {
    axios.get(`http://localhost:3000/checkout/by/${user._id}`,
      { withCredentials: true })
      .then(response => {
        setCheckoutInfo(response.data.filter((checkout: ICheckout) => checkout.book === _id)[0])
      })
      .catch(error => console.error(error))
  }

  const getLenderName = async () => {
    axios.get(`http://localhost:3000/users/${lender}`,
      { withCredentials: true })
      .then(response => {
        setLenderName('@' + response.data.user.username)
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getLenderName()
    getCheckoutInfo()
  }, [])

  const btnColor = useColorModeValue('gray.50', 'gray.600')
  const checkedOut = !!checkoutInfo?.due_date
  const isPending = !!checkoutInfo && !checkedOut
  const shouldDisable = isPending || checkedOut
  return (
    <Center m={4}>
      <Flex align="center" >
        <VStack spacing='20px' >
          <Box marginTop="20px" w={'100%'}>
            <Image src={cover_image} aspectRatio={'4/1'} fit={'cover'} rounded={'2xl'} minW={'100%'} w={'100%'} minH={'200px'} alt="Banner Image"/>
          </Box>
          <Box width="100%">
            <HStack spacing="40px">
              <Spacer />
              {/*<StarRating rating={3.5}/>*/}
            </HStack>
          </Box>
          <Stack width="100%" gap={3} borderRadius={'2xl'} bg={useColorModeValue('gray.100', 'gray.700')} padding={7}>
            <Text fontSize="2xl" fontWeight={'bold'} fontFamily={'Poppins'}>{title}</Text>
            <Text fontSize="xl" fontFamily={'Poppins'}>Written by {author}</Text>
            <Text fontSize="md" fontFamily={'Poppins'}>{description}</Text>
            <HStack justifyContent={'space-between'} w={'100%'}>
              <Link href={`/profile?id=${lender}`}>
              <HStack>
                <Avatar size={'md'} mr={3}/>
                <Text fontSize="md"><span className='theme-header'>{lenderName.slice(0, 12) + (lenderName.length > 20 ? '...' : '')}</span></Text>
              </HStack>
              </Link>
                <Button size="lg" rounded={'2xl'} bg={requestAvailable? btnColor : 'red.300'} onClick={checkout} isDisabled={shouldDisable}>
                {checkedOut && 'Due: ' + checkoutInfo?.due_date?.toString().slice(0, 10)}
                {!checkedOut && isPending &&  'Pending'}
                {!checkedOut && !isPending && 'Request Checkout'}
                </Button>
            </HStack>
          </Stack>
        </VStack>
      </Flex>
    </Center>
  )
}
