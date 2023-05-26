import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    Center,
    Link,
    useColorModeValue
  } from '@chakra-ui/react'
  import { PasswordField } from './PasswordField'
  import React, { ChangeEvent, ChangeEventHandler } from 'react'
  import axios from 'axios'
  import {Link as ReactLink} from 'react-router-dom'

interface LoginCredentials {
  email: string,
  password: string
}

export const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

    const login = async () => {
      const response = await axios.post('http://localhost:3000/users/login',
      {email, password});
      console.log(response.data);
      // TODO: ADD ALERT WHEN LOGIN FAILS AND RESET FIELDS
    }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Center></Center>
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'lg', md: 'lg' }}><span className='theme-header'>Login</span></Heading>
            <HStack spacing="1" justify="center">
              <Text color={"muted"}>Don't have an account yet?</Text>
              <Link as={ReactLink} to='/signup'>
                <Button variant="link" colorScheme="blue" className='theme-header'>
                  Sign up
                </Button>
              </Link>
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
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" onChange={
                  (e: React.FormEvent<HTMLInputElement>) => {
                    setEmail(e.currentTarget.value)
                  }} />
              </FormControl>
              <PasswordField onChange={
                (e: React.FormEvent<HTMLInputElement>) => {
                  setPassword(e.currentTarget.value)
                }} />
            </Stack>
            <HStack justify="space-between">
            </HStack>
            <Stack spacing="6">
              <Button variant="primary" type='submit' onClick={login} background={useColorModeValue('gray.100', 'gray.600')}>Sign in</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}