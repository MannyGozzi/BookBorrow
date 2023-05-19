import React from 'react'
import ThemedHeader from '../components/ThemedHeader'
import { Login as LoginComp }  from '../components/Login'
import { Center } from '@chakra-ui/react'


const Login = () => {
  return (
    <section>
      <LoginComp />
    </section>
  )
}

export default Login