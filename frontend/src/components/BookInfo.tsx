import {
  Box,
  HStack,
  VStack,
  Text,
  Image,
  Center,
  Avatar,
  MenuButton,
  Flex,
  Menu,
  Spacer,
  Button,
  Stack,
  useColorModeValue
} from '@chakra-ui/react'
import StarRating from './RatingStars'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IBook } from '../types';

export default function ProfileInfo({cover_image, title, author, description, lender} : IBook) {

  const checkout = () => {
    console.log("Checkout")
  }

  return (
    <Center m={4}>
      <Flex align="center">
        <VStack spacing='20px'>
          <Box marginTop="20px">
            <Image src={cover_image} aspectRatio={'4/1'} fit={'cover'} rounded={'2xl'} minW={'100%'} w={'100%'} minH={'200px'} alt="Banner Image"/>
          </Box>
          <Box width="100%">
            <HStack spacing="40px">

              <Spacer />
              {/*<StarRating rating={3.5}/>*/}
            </HStack>
          </Box>
          <Stack width="100%" gap={3}>
            <Text fontSize="2xl" fontWeight={'bold'}>{title}</Text>
            <Text fontSize="xl" fontWeight={'bold'}>{author}</Text>
            <Text fontSize="md">{description}</Text>
            <HStack justifyContent={'space-between'} w={'100%'}>
              <HStack>
                <Avatar size={'md'}/>
                <Text fontSize="xl"><span className='theme-header'>{lender.slice(0, 12) + '...'}</span></Text>
              </HStack>
              <Button size="lg" rounded={'2xl'} bg={useColorModeValue('gray.200', 'gray.700')} onClick={checkout}>
                Request Checkout
              </Button>
            </HStack>
          </Stack>
        </VStack>
      </Flex>
    </Center>
  )
}
