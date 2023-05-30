import {
  Box,
  Center,
  Heading,
  Text,
  useColorModeValue,
  Image,
  HStack,
  Button,
  Flex,
  Link,
} from '@chakra-ui/react';
import { NavLink as ReactLink } from 'react-router-dom';
import { IBook } from '../types.d';
import { DeleteIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { removeBook } from '../actions/bookActions';
import axios from 'axios';

// Take in book type and convert to BookViewType instead???
function UserBook({ _id, lender, title, author, isbn, description, cover_image }: IBook) {
  const rating = Math.random() * 5;
  const isAvailable = true;
  const dispatch = useDispatch()

  const deleteBook = () => {
    axios.post(`http://localhost:3000/books/delete`,
      { _id }, 
      { withCredentials: true })
      .then(response => {
        dispatch(removeBook(_id))
      })
      .catch(error => console.error(error))
  }

  return (
    <Center >
      
      <Box
        maxW={'445px'}
        h={'450px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'xl'}
        rounded={'xl'}
        p={3}
        overflow={'hidden'}>
          <Link as={ReactLink} to={`/books/${_id}`}>
        <Box
          h={'200px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            src={cover_image}
            boxSize={'full'}
            objectFit='cover'
            alt='Book Image' />
        </Box>
        
        <Flex flexDir={'column'} h={'53%'} justifyContent={'space-between'}>
          <Box>
            <Heading
              color={useColorModeValue('gray.600', 'white')}
              fontSize={'xl'}
              fontFamily={'Poppins'}
              mt={0}
              mb={2}>
              {title}
            </Heading>
            <HStack className='content-center' mb={2}>
              <Text
                color={'red.300'}
                textTransform={'uppercase'}
                fontWeight={800}
                fontFamily={'Poppins'}
                fontSize={'sm'}>
                {author}
              </Text>
              <Text
                textTransform={'uppercase'}
                fontWeight={400}
                fontSize={'xs'}
                letterSpacing={1.1}
                key={isbn}>
                | {isbn}
              </Text>
            </HStack>

            <Text
              color={'gray.500'}
              fontFamily={'body'}
              mb={4}>
              {description}
            </Text>
          </Box>
          <HStack gap={3} justifyContent={'space-between'} background={useColorModeValue('gray.100', 'gray.600')} rounded={'2xl'} p={2} overflow={'hidden'}>
              <Button 
                rounded={'2xl'}
                variant={'solid'}
                background={useColorModeValue('gray.100', 'gray.600')}
                color={'red.300'}
                fontFamily={'Poppins'}
                size={'md'}
                leftIcon={<DeleteIcon/>}
                onClick={e=>{
                  e.preventDefault()
                  deleteBook()
                }}>
                Delete
              </Button>
          </HStack>
        </Flex>
        </Link>
      </Box>

    </Center>
  );
}

export default UserBook;
