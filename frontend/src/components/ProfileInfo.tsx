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
    Menu,
    Card, CardHeader, CardBody, CardFooter, StackDivider, Spacer
  } from '@chakra-ui/react'
  
  import StarRating from './RatingStars'

  export default function ProfileInfo() {
  return (
    <Center>
    <Flex align="center"justifyContent="center">
      <VStack spacing='20px'>
      <Box marginTop="20px">
        <Image src="https://img.freepik.com/free-photo/beautiful-outdoor-view-ocean-beach_74190-6853.jpg?w=2000" alt="Banner Image" style={{ width: '700px', height: '300px', borderRadius: '10px' }} />
      </Box>
        <Box width="700px">
            <HStack spacing="40px">
              <HStack spacing="30px"> 
                <Text fontSize="3xl"><span className='theme-header'>Profile Name</span></Text>
                <Menu>
                  <MenuButton>
                    <Avatar
                      size={'md'}
                      src='https://bit.ly/broken-link'
                    />
                  </MenuButton>
                </Menu>
              </HStack>
              <Spacer />
              <StarRating/>
            </HStack>
            </Box>
            <Box width="700px">
              <HStack spacing='40px'> 
                    <Text fontSize="md">Email: user@gmail.com</Text>
                <Spacer />
                <Button
                  variant={'solid'}
                  colorScheme={'orange'}
                  size={'md'}
                  m={4}>
                  Upload Book
                </Button>
              </HStack>
                  <Text fontSize="md">Phone Number: 1-800-000-0000</Text>
          </Box>
          </VStack>
          </Flex>
      </Center>
    )
  }
  