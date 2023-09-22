import {
    Box,
    Text,
    Flex,
    useColorModeValue,
    Image
  } from '@chakra-ui/react';
  import { ReactNode } from 'react';
  import BooBo_logo from '../assets/BooBo_logo.png';
  
  export default function Footer() {
    return (
      <Box
        bg={useColorModeValue('red.100', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        pt={'3rem'}>
        <Box py={10}>
          <Flex
            align={'center'}
            _before={{
              content: '""',
              borderBottom: '3px solid',
              borderColor: useColorModeValue('red.200', 'gray.700'),
              flexGrow: 1,
              borderRadius: 'lg',
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: '3px solid',
              borderColor: useColorModeValue('red.200', 'gray.700'),
              borderRadius: 'lg',
              flexGrow: 1,
              ml: 8,
            }}>
            <Image src={BooBo_logo} boxSize={'4rem'} />
          </Flex>
          <Text pt={6} fontSize={'sm'} textAlign={'center'}>
            © {(new Date()).getFullYear()} <Text as='span' fontFamily={'Pacifico'}>BooBo</Text>. All rights reserved
          </Text>
        </Box>
      </Box>
    );
  }