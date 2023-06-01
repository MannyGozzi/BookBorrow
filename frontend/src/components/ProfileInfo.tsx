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
import { setBooks } from '../actions/bookActions';
import { IReview } from '../types';

export default function ProfileInfo({userId, isLocalUser} : {userId: string, isLocalUser: boolean}) {

  const user = useSelector((state: any) => state.user)
  const [currentUser, setUser] = useState<IUser>();
  const dispatch = useDispatch()
  const [averageRating, setAverageRating] = useState<number>(0);
  const [numRatings, setNumRatings] = useState<number>(0);

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${userId}`)
    .then(res => {
        dispatch(setCurrentUser(res.data.user))
        setUser(res.data.user)
        calculateAverageRating(res.data.user.reviews);
    })
    .catch(err => console.log(err.message))

      axios.get(`http://localhost:3000/users/${userId ? userId : user._id}`)
      .then(res => {
          dispatch(setBooks(res.data.books))
      })
      .catch(err => console.log(err.message))

      axios.get(`http://localhost:3000/checkout/from/${user._id}`, {withCredentials: true})
}, [dispatch, userId])

  const calculateAverageRating = (reviews: IReview[]) => {
    if (!reviews) return
    if (reviews.length === 0) {
      setAverageRating(0);
      return;
    }

    let totalRating = 0;
    let i = 0
    for (i; i < reviews.length; i++) {
      totalRating += reviews[i].rating;
    }

    const totalReviews = i;
    const average = totalRating / reviews.length;
    setAverageRating(average);
    setNumRatings(totalReviews)
  }
  
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
              <VStack spacing="5px" align="flex-end">
                <StarRating rating={averageRating}/>
                <Text fontSize="xs">(Number of Ratings: {numRatings})</Text>
              </VStack>
            </HStack>
          </Box>
          <Box width="100%">
            <HStack spacing='40px'>
              <Text fontSize="md">Email: {currentUser?.email}</Text>
              <Spacer />
              {isLocalUser && <BookUpload/>}
            </HStack>
          </Box>
        </VStack>
      </Flex>
    </Center>
  )
}
