import { Flex, Icon } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt} from 'react-icons/fa';

interface IRating {
  rating: number
}

const StarRating = ({rating} : IRating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating - fullStars >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
    return (
      <Flex justifyContent={'center'}>
        {[...Array(fullStars)].map((_, index) => (
          <Icon key={index} as={FaStar} color="yellow.500" boxSize={6} />
        ))}
        {hasHalfStar && (
            <Icon as={FaStarHalfAlt} color="yellow.500" boxSize={6} />         
        )}
        {[...Array(emptyStars)].map((_, index) => (
        <Icon key={index} as={FaStar} color="gray.400" boxSize={6} />
      ))}
      </Flex>
    );
  };

export default StarRating
  