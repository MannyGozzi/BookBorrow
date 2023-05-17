import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    VStack,
    Input,
    Stack,
    Text,
    Image, 
    Center,
    Avatar,
    MenuButton,
    Flex,
    Menu
  } from '@chakra-ui/react'
  
  export default function ProfileInfo() {
  return (
    <Container maxW='700px'>
      <Flex h={200} alignItems={'center'} justifyContent={'space-between'}>
      <HStack spacing='30px'>
      <Box w='100px' h='100px'>
        <Text fontSize="2xl"><span className='theme-header'>Profile</span></Text>
      </Box>
      <Menu>
        <MenuButton
          as={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
          minW={0}>
          <Avatar
              size={'md'}
              src='https://bit.ly/broken-link'
          />
        </MenuButton>
      </Menu>
      <Box w='100px' h='100px'>
      <Text fontSize="2xl"><span className='theme-header'>Stars</span></Text>
      </Box>
    </HStack>
    </Flex>

    <VStack spacing='10px'>
      <Box w='100px' h='100px'>
        <Text fontSize="2xl"><span className='theme-header'>Email</span></Text>
      </Box>
      <Box w='175px' h='100px'>
      <Text fontSize="2xl"><span className='theme-header'>Phone Number</span></Text>
      </Box>
    </VStack>
    
    </Container>
    )
  }