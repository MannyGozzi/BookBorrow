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
    Card, CardHeader, CardBody, CardFooter, StackDivider
  } from '@chakra-ui/react'
  
  export default function ProfileInfo() {
  return (
    <Center>
    {/* <Flex alignItems="center" justifyContent="flex-start"> */}
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <HStack spacing='30px'>
          <Box w='500px' h='100px'>
              <Text fontSize="2xl"><span className='theme-header'>Profile</span></Text>
            </Box>
            <Menu>
              <MenuButton>
                <Avatar
                  size={'md'}
                  src='https://bit.ly/broken-link'
                />
              </MenuButton>
            </Menu>
            </HStack>
            </Flex>
      </Container>
     {/* </Flex> */}
    </Center>
    )
  }