import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Center,
  Text,
  Link,
  useColorModeValue
} from '@chakra-ui/react'
import { PasswordField, ConfirmPasswordField } from './PasswordField'
import { Link as ReactLink } from 'react-router-dom'
import React from 'react'
import axios from 'axios';

export const Signup = () => {

  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [zipCode, setZipCode] = React.useState('')

  const signup = async () => {
    const response = await axios.post('http://localhost:3000/users/register',
    {firstName, lastName, email, password, zip_code: zipCode, username});
    console.log(response.data);
  }

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="4">
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
        <Center pb={5}>
          <Text color={"muted"} mr={1}>Don't have an account yet? </Text>
          <Link as={ReactLink} to='/login'>
            <Button variant="link" colorScheme="blue" className='theme-header'>
              Login
            </Button>
          </Link>
        </Center>
        <Box
          py={{ base: '4', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg-surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="First Name">First Name</FormLabel>
                <Input id="First Name" type="text" onChange={
                  (e: React.FormEvent<HTMLInputElement>) => {
                    setFirstName(e.currentTarget.value)
                  }} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="Last Name">Last Name</FormLabel>
                <Input id="Last Name" type="text" onChange={
                  (e: React.FormEvent<HTMLInputElement>) => {
                    setLastName(e.currentTarget.value)
                  }} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" onChange={
                  (e: React.FormEvent<HTMLInputElement>) => {
                    setEmail(e.currentTarget.value)
                  }} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="Username">Username</FormLabel>
                <Input id="Username" type="text" onChange={
                  (e: React.FormEvent<HTMLInputElement>) => {
                    setUsername(e.currentTarget.value)
                  }} />
              </FormControl>
              <PasswordField onChange={
                (e: React.FormEvent<HTMLInputElement>) => {
                  setPassword(e.currentTarget.value)
                }} />
              <ConfirmPasswordField />
              <FormControl>
                <FormLabel htmlFor="ZipCode">Zip Code</FormLabel>
                <Input id="ZipCode" type="text" onChange={
                  (e: React.FormEvent<HTMLInputElement>) => {
                    setZipCode(e.currentTarget.value)
                  }} />
              </FormControl>
            </Stack>
            <HStack justify="space-between">
            </HStack>
            <Stack spacing="6">
              <Button variant="primary" type='submit'
                background={useColorModeValue('gray.100', 'gray.600')}
                onClick={signup}>Sign Up</Button>
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
