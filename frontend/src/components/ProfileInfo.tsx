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
  Spacer
} from '@chakra-ui/react'
import BookUpload from './BookUpload'
import StarRating from './RatingStars'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import { setCurrentUser } from '../actions/userActions'
import { IUser } from '../types';

export default function ProfileInfo({userId} : {userId: string}) {

  const user = useSelector((state: any) => state.user)
  const [currentUser, setUser] = useState<IUser>();
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${userId}`)
    .then(res => {
        dispatch(setCurrentUser(res.data.user))
        setUser(res.data.user)
    })
    .catch(err => console.log(err.message))
}, [dispatch, userId])

  return (
    <Center m={4}>
      <Flex align="center">
        <VStack spacing='20px'>
          <Box marginTop="20px">
            <Image src="https://img.freepik.com/free-photo/beautiful-outdoor-view-ocean-beach_74190-6853.jpg?w=2000" aspectRatio={'4/1'} fit={'cover'} rounded={'2xl'} w={'100%'} alt="Banner Image"/>
          </Box>
          <Box width="100%">
            <HStack spacing="40px">
              <HStack spacing="30px">
                <Text fontSize="3xl"><span className='theme-header'>{currentUser?.first_name} {currentUser?.last_name}</span></Text>
                <Menu>
                  <MenuButton>
                    <Avatar
                      size={'md'}
                      src='https://bit.ly/broken-link'
                    />
                  </MenuButton>
                </Menu>
              </HStack>
              <Spacer />
              <StarRating rating={3.5}/>
            </HStack>
          </Box>
          <Box width="100%">
            <HStack spacing='40px'>
              <Text fontSize="md">Email: {currentUser?.email}</Text>
              <Spacer />
              <BookUpload/>
            </HStack>
          </Box>
        </VStack>
      </Flex>
    </Center>
  )
}
