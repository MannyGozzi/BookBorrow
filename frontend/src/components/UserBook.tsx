import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image
} from '@chakra-ui/react';

export type UserBookType = {
  title: string,
  author: string, 
  isbn: string,
  description: string,
  image: string
}

function UserBook({title, author, isbn, description, image}: UserBookType) {
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        h={'full'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            src={image}
            boxSize={'full'}
            objectFit='cover'
            alt='Book Image'
          />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            {author} | {isbn}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {title}
          </Heading>
          <Text color={'gray.500'}>
            {description}
          </Text>
        </Stack>
        
      </Box>
    </Center>
  );
}

export default UserBook;