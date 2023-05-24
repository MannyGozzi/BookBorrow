import { Box, Icon } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt} from 'react-icons/fa';

const StarRating = () => {
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
  