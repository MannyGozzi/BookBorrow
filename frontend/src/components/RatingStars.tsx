import { Box, Icon } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { setReviews } from '../actions/reviewActions'
import { IReview } from '../types';

const StarRating = () => {
    const user = useSelector((state: any) => state.user)
    const [userReviews, setUserReviews] = useState<IReview[]>([])
    const dispatch = useDispatch()
    const reduxReviews = useSelector((state: any) => state.reviews)

  useEffect(() => {
      axios.get(`http://localhost:3000/users/${user._id}`)
      .then(res => {
          dispatch(setReviews(res.data.reviews))
          setUserReviews(res.data.reviews)
      })
      .catch(err => console.log(err.message))
  }, [])

    const fullStars = Math.floor(2); // Number of full stars
    const hasHalfStar = 2 - fullStars >= 0.5; // Check if there's a half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
    return (
      <Box>
        {[...Array(fullStars)].map((_, index) => (
          <Icon key={index} as={FaStar} color="yellow.500" boxSize={6} />
        ))}
        {hasHalfStar && (
            <Icon as={FaStarHalfAlt} color="yellow.500" boxSize={6} />         
        )}
        {[...Array(emptyStars)].map((_, index) => (
        <Icon key={index} as={FaStar} color="gray.400" boxSize={6} />
      ))}
      </Box>
    );
  };

export default StarRating
  