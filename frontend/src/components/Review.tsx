import {
    Box,
    Center,
    Heading,
    Text,
    useColorModeValue,
    Image,
    HStack,
    Flex,
    useToast,
    Icon
  } from '@chakra-ui/react';
  import { FaStar, FaStarHalfAlt} from 'react-icons/fa';
  import axios from 'axios';
  import { useEffect, useState } from 'react';
  import { IReview } from '../types';
  import { CalendarIcon } from '@chakra-ui/icons';
  
  function Review({ _id, reviewer, reviewed, rating, comment, date_created}: IReview) {  
    return (
        <Center>
          <Box
            maxW={'445px'}
            h={'400px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'xl'}
            rounded={'xl'}
            p={3}
            overflow={'hidden'}
          >
            <Flex flexDir={'column'} h={'100%'} justifyContent={'space-between'}>
              <Box>
                <Heading
                  color={useColorModeValue('gray.600', 'white')}
                  fontSize={'xl'}
                  fontFamily={'Poppins'}
                  mt={0}
                  mb={2}
                >
                  {reviewer}
                </Heading>
                <HStack className="content-center" mb={2}>
                  {Array.from({ length: rating }).map((_, index) => (
                    <FaStar key={index} color={'yellow.400'} />
                  ))}
                </HStack>
    
                <Text color={'gray.500'} fontFamily={'body'} mb={4}>
                  {comment}
                </Text>
                <Text fontFamily={'Poppins'}>
                  <CalendarIcon mx={2} /> {new Date(date_created).toDateString()}
                </Text>
              </Box>
            </Flex>
          </Box>
        </Center>
      );
    };
    
  
  export default Review;

// import { Box, Heading, Text, useColorModeValue, HStack, Icon } from '@chakra-ui/react';
// import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
// import { CalendarIcon } from '@chakra-ui/icons';
// import { IReview } from '../types';

// function Review({ reviewer, rating, comment, date_created }: IReview) {
//   return (
//     <Box
//       bg={useColorModeValue('white', 'gray.700')}
//       boxShadow={'xl'}
//       rounded={'xl'}
//       p={3}
//       mb={4}
//     >
//       <Heading
//         color={useColorModeValue('gray.600', 'white')}
//         fontSize={'xl'}
//         fontFamily={'Poppins'}
//         mt={0}
//         mb={2}
//       >
//         {reviewer}
//       </Heading>
//       <HStack className="content-center" mb={2}>
//         {Array.from({ length: rating }).map((_, index) => (
//           <FaStar key={index} color={'yellow.400'} />
//         ))}
//       </HStack>

//       <Text color={'gray.500'} fontFamily={'body'} mb={4}>
//         {comment}
//       </Text>
//       <Text fontFamily={'Poppins'}>
//         <Icon as={CalendarIcon} mx={2} /> {new Date(date_created).toDateString()}
//       </Text>
//     </Box>
//   );
// }

// export default Review;