import { Flex, Icon } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt} from 'react-icons/fa';
import { useState, useEffect } from 'react';

interface IRating {
  rating: number;
  onChange: (rating: number) => void;
}

const StarRatingReview = ({ rating, onChange }: IRating) => {
  const [selectedRating, setSelectedRating] = useState<number>(rating);
//   const [initialRating, setInitialRating] = useState<number>(rating);

  const handleClick = (clickedRating: number) => {
    setSelectedRating(clickedRating);
    onChange(clickedRating);
  };

//   useEffect(() => {
//     setInitialRating(rating);
//   }, [rating]);

//   const resetRating = () => {
//     setSelectedRating(initialRating);
//     onChange(initialRating);
//   };
  const fullStars = Math.floor(selectedRating);
  const hasHalfStar = selectedRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <Flex justifyContent={'center'}>
      {[...Array(fullStars)].map((_, index) => (
        <Icon
          key={index}
          as={FaStar}
          color="yellow.500"
          boxSize={6}
          onClick={() => handleClick(index + 1)}
        />
      ))}
      {hasHalfStar && (
        <Icon
          as={FaStarHalfAlt}
          color="yellow.500"
          boxSize={6}
          onClick={() => handleClick(fullStars + 0.5)}
        />
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <Icon
          key={index}
          as={FaStar}
          color="gray.400"
          boxSize={6}
          onClick={() => handleClick(fullStars + index + 1)}
        />
      ))}
    </Flex>
  );
};

export default StarRatingReview;