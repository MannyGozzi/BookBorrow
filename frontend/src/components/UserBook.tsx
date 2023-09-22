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
  useToast,
} from '@chakra-ui/react';
import { NavLink as ReactLink } from 'react-router-dom';
import { IBook } from '../types.d';
import { DeleteIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { removeBook } from '../actions/bookActions';
import axios from 'axios';
import { useCallback } from 'react';

// Take in book type and convert to BookViewType instead???
function UserBook({ _id, lender, title, author, isbn, description, cover_image }: IBook) {
  const dispatch = useDispatch()
  const toast = useToast()

  const deleteBook = useCallback(() => {
    axios.post(`http://localhost:3000/books/delete`,
      { _id }, 
      { withCredentials: true })
      .then(response => {
        dispatch(removeBook(_id))
        toast({
          title: 'Delete Success!',
          description: "You've successfully deleted a book! 🔥",
          status: 'success',
          duration: 7000,
          isClosable: true,
        })
      })
      .catch(error => console.error(error))
  }, [])

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
          <Link as={ReactLink} to={`/book?id=${_id}`}>
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
        </Link>
        
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
          <HStack gap={3} justifyContent={'space-between'} background={useColorModeValue('gray.100', 'gray.600')} rounded={'2xl'} p={2} overflow={'hidden'} >
              <Button 
                rounded={'2xl'}
                variant={'solid'}
                background={useColorModeValue('gray.100', 'gray.600')}
                fontFamily={'Poppins'}
                size={'md'}
                color={'red.300'}
                w={'100%'}
                onClick={e=>{
                  e.preventDefault()
                  deleteBook()
                }}>
                  <HStack justifyContent={'space-between'} w={'100%'}>
                    <Text>Delete</Text>
                    <DeleteIcon/>
                  </HStack>
              </Button>
          </HStack>
        </Flex>

      </Box>

    </Center>
  );
}

export default UserBook;
