import {
    Box,
    Center,
    Heading,
    Text,
    useColorModeValue,
    HStack,
    Flex,
  } from '@chakra-ui/react';
  import { FaStar} from 'react-icons/fa';
  import axios from 'axios';
  import { useEffect, useState } from 'react';
  import { IReview } from '../types';
  import { CalendarIcon } from '@chakra-ui/icons';
  import { IUser } from '../types';
  import { useDispatch } from 'react-redux'
  
  function Review({ _id, reviewer, reviewed, rating, comment, date_created}: IReview) {  

    const [currentUser, setCurrentUser] = useState<IUser>();
    const dispatch = useDispatch()
    
    useEffect(() => {
      axios.get(`http://localhost:3000/users/${reviewer}`)
      .then(res => {
          setCurrentUser(res.data.user)
      })
      .catch(err => console.log(err.message))
    }, [dispatch, _id, reviewer])

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
                  {currentUser?.first_name} {currentUser?.last_name}
                </Heading>
                <HStack className="content-center" mb={2}>
                  {Array.from({ length: rating }).map((_, index) => (
                    <FaStar key={index} color={'yellow.400'} />
                  ))}
                </HStack>
                  
                <Text color={'gray.500'} fontFamily={'body'} mb={4}>
                  {comment}
                </Text>
                </Box>
                <Box >
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