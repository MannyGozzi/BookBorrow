import React from 'react'
import ThemedHeader from '../components/ThemedHeader'
import { Login as LoginComp }  from '../components/Login'
import { Center } from '@chakra-ui/react'
import DocTitle from '../components/DocTitle'

const Login = () => {
  DocTitle("Login Page | Boobo")
  return (
    <section className='flex justify-center items-center'>
      <LoginComp />
    </section>
  )
}

export default Login