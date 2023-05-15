import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  HStack,
  Button,
  ButtonGroup
} from '@chakra-ui/react';

import {StarIcon} from '@chakra-ui/icons';
import { BookViewType } from '../types';

function BookView({title, author, isbn, description, image, rating, distance}: BookViewType) {
  return (
    <Center >
      <Box
        maxW={'445px'}
        h={'full'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'xl'}
        rounded={'xl'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Center position={'relative'}>
              <Button
                rounded={'full'}
                variant={'solid'}
                position={'absolute'}
                right={'5px'}
                top={'5px'}
                colorScheme={'teal'}
                size={'lg'}
                m={4}>
                View
              </Button>
              <Button
                rounded={'full'}
                variant={'solid'}
                position={'absolute'}
                right={'5px'}
                top={'65px'}
                colorScheme={'teal'}
                size={'lg'}
                m={4}>
                Lender
              </Button>
          </Center>
          <Image
            src={image}
            boxSize={'full'}
            objectFit='cover'
            alt='Book Image'/>
        </Box>
        <Stack>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
            m={0}>
            {title}
          </Heading>
          <HStack className='content-center'>
            <Text
              color={'red.300'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}>
              {author}
            </Text>
            <Text
              textTransform={'uppercase'}
              fontWeight={400}
              fontSize={'xs'}
              letterSpacing={1.1}>
              | {isbn}
            </Text>
          </HStack>
          <HStack>
            {[...Array(Math.floor(rating))].map((star, index) => <StarIcon key={index} color={'red.300'}/>)}
            {[...Array(5-Math.floor(rating))].map((star, index) => <StarIcon key={index + 5} color={'gray.300'}/>)}
          </HStack>
          <Text 
          color={'gray.500'}
          fontFamily={'body'}>
            {description}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
}

export default BookView;