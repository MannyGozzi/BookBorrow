import {
  Box,
  Center,
  Heading,
  Text,
  Avatar,
  useColorModeValue,
  Image,
  HStack,
  Button,
  Flex, 
  Spacer,
  Link
} from '@chakra-ui/react';

import {StarIcon} from '@chakra-ui/icons';
import { BookViewType } from '../types';

function BookView({ title, author, isbn, description, image, rating, distance}: BookViewType) {
  return (
    <Center >
      <Box
        maxW={'445px'}
        h={'480px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'xl'}
        rounded={'xl'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'200px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            src={image}
            boxSize={'full'}
            objectFit='cover'
            alt='Book Image'/>
        </Box>
        <Flex flexDir={'column'} height={'54.5%'} >
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
            mt={0}
            mb={2}>
            {title}
          </Heading>
          <HStack className='content-center' mb={2}>
            <Text
              color={'red.300'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}>
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
          <HStack justifyContent={'space-between'} mb={2}>
            <HStack>
              {[...Array(Math.floor(rating))].map((star, index) => <StarIcon key={index} color={'red.300'}/>)}
              {[...Array(5-Math.floor(rating))].map((star, index) => <StarIcon key={index + 5} color={'gray.300'}/>)}
            </HStack>
            <Text fontWeight={'bold'}>{distance}mi.</Text>
          </HStack>
          <Text 
          color={'gray.500'}
          fontFamily={'body'}
          mb={4}>
            {description}
          </Text>
          <Spacer />
          <HStack gap={3} justifyContent={'space-between'}>
            <Link href='/'>
              <HStack>
              <Avatar size={'sm'} />
              <Text fontWeight={'bold'}>@lender_name</Text>
              </HStack>
            </Link>
            <Link href='/'>
              <Button
                rounded={'2xl'}
                variant={'solid'}
                colorScheme={'gray'}
                size={'lg'}>
                View
              </Button>
            </Link>
          </HStack>
        </Flex>
      </Box>
    </Center>
  );
}

export default BookView;
