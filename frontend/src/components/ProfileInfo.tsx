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
import { useDispatch } from 'react-redux'
import { IUser } from '../types';
import { setBooks } from '../actions/bookActions';
import ReviewUpload from './ReviewUpload';

export default function ProfileInfo({userid, isLocalUser} : {userid: string, isLocalUser: boolean}) {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const dispatch = useDispatch()
  const [averageRating, setAverageRating] = useState<number>(0);
  const [numRatings, setNumRatings] = useState<number>(0);

  const getRating = async () => {
    axios
      .get(`http://localhost:3000/reviews/${userid}`, { withCredentials: true })
      .then(response => {
        let avgRating = 0;
        let numReviews = 0;
        if (response.data && response.data.length > 0) {
          avgRating = response.data.reduce((acc: number, review: any) => acc + review.rating, 0);
          numReviews = response.data.length;
          avgRating /= numReviews;
        }
        setAverageRating(avgRating);
        setNumRatings(numReviews);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${userid}`)
    .then(res => {
        setCurrentUser(res.data.user)
        getRating();
    })
    .catch(err => console.log(err.message))

      axios.get(`http://localhost:3000/users/${userid}`)
      .then(res => {
          dispatch(setBooks(res.data.books))
      })
      .catch(err => console.log(err.message))

      axios.get(`http://localhost:3000/checkout/from/${userid}`, {withCredentials: true})
      // eslint-disable-next-line
}, [dispatch, userid])
  
  return (
    <Center m={4}>
      <Flex align="center">
        <VStack spacing='20px'>
          <Box marginTop="20px">
            <Image src="https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" aspectRatio={'4/1'} fit={'cover'} rounded={'2xl'} w={'100%'} alt="Banner Image"/>
          </Box>
          <Box width="100%">
            <HStack spacing="40px">
              <HStack spacing="30px">
                <Text fontSize="3xl"><span className='theme-header'>{currentUser?.first_name} {currentUser?.last_name}</span></Text>
                <Menu>
                  <MenuButton>
                    <Avatar
                      size={'md'}
                    />
                  </MenuButton>
                </Menu>
              </HStack>
              <Spacer />
              <VStack spacing="5px" align="flex-end">
                <StarRating rating={averageRating}/>
                <Text fontSize="xs">(Number of Reviews: {numRatings})</Text>
              </VStack>
            </HStack>
          </Box>
          <Box width="100%">
            <HStack spacing='40px'>
              <Text fontSize="md">Email: {currentUser?.email}</Text>
              <Spacer />
              {isLocalUser && <BookUpload/>}
              {!isLocalUser && <ReviewUpload reviewLenderID={userid}/>}
            </HStack>
          </Box>
        </VStack>
      </Flex>
    </Center>
  )
}
