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
    Input,
    Stack,
    Text,
    Image, 
    Center
  } from '@chakra-ui/react'
  import { PasswordField, ConfirmPasswordField } from './PasswordField'
  import BooBo_logo from '../assets/BooBo_logo.png'
  
  export default function SignUp() {
  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Center></Center>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'lg', md: 'lg' }}><span className='theme-header'>Sign Up</span></Heading>
            <HStack spacing="1" justify="center">
              <Button variant="link" colorScheme="blue" className='theme-header'>
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg-surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
            <FormControl>
                <FormLabel htmlFor="Name">Name</FormLabel>
                <Input id="Name" type="text" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField />
              <ConfirmPasswordField />
              <FormControl>
                <FormLabel htmlFor="ZipCode">Zip Code</FormLabel>
                <Input id="ZipCode" type="text" />
              </FormControl>
            </Stack>
            <HStack justify="space-between">
            </HStack>
            <Stack spacing="6">
              <Button variant="primary">Sign Up</Button>
              <HStack>
                <Divider />
                <Divider />
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
    )
  }