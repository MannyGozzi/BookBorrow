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
    useColorModeValue,
    Alert,
    AlertIcon,
    useToast
  } from '@chakra-ui/react'
  import { PasswordField } from './PasswordField'
  import React, { useEffect } from 'react'
  import axios from 'axios'
  import {Link as ReactLink, useNavigate} from 'react-router-dom'
  import { useDispatch } from 'react-redux'
  import { setCurrentUser } from '../actions/userActions'

  interface LoginCredentials {
    email: string,
    password: string
  }
  
  export const Login = () =>  {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loginFail, setLoginFail] = React.useState(false)
    const toast = useToast()

    const redirect = useNavigate();

    const dispatch = useDispatch()

    const login = async () => {
      await axios.post('http://localhost:3000/users/login',
        {email, password},
        {withCredentials: true})
        .then((response) => {
          dispatch(setCurrentUser(response.data.user))
          toast({
            title: 'Login Success! 🔥',
            description: "Welcome back!",
            status: 'success',
            duration: 7000,
            isClosable: true,
          })
          redirect('/')
        })
        .catch((error) => {
          console.log(error)
          setLoginFail(true)
          toast({
            title: 'Login Failed 😔',
            description: "It looks like your password or email is wrong",
            status: 'error',
            duration: 7000,
            isClosable: true,
          })
        })
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
        {loginFail &&
          <Alert status='error' rounded={'xl'} mb={10}>
            <AlertIcon />
            Incorrect email or password
          </Alert>
          }
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          borderRadius={'2xl'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          borderWidth={'5px'}
        >

          <Stack spacing="6">
            <Stack spacing="5" fontFamily={'Poppins'}>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" onChange={
                  (e : React.FormEvent<HTMLInputElement>) => {
                    setEmail(e.currentTarget.value)}}/>
              </FormControl>
              <PasswordField onChange={
                  (e : React.FormEvent<HTMLInputElement>) => {
                    setPassword(e.currentTarget.value)}}/>
            </Stack>
            <HStack justify="space-between">
            </HStack>
            <Stack spacing="6">
              <Button fontFamily={'Poppins'} variant="primary" type='submit' onClick={login} background={useColorModeValue('gray.200', 'gray.600')} rounded={'xl'}>Sign in</Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}