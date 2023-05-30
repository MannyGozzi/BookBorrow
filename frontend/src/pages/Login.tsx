import React from 'react'
import ThemedHeader from '../components/ThemedHeader'
import { Login as LoginComp }  from '../components/Login'
import { Center } from '@chakra-ui/react'


const Login = () => {
  return (
    <section className='flex justify-center items-center'>
      <LoginComp />
    </section>
  )
}

export default Login