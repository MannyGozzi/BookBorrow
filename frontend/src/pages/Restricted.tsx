import React from 'react'
import ThemedHeader from '../components/ThemedHeader'
import { AbsoluteCenter, Image, VStack, Box, Text } from '@chakra-ui/react'
import BooBo_logo from '../assets/BooBo_logo.png'
import DocTitle from '../components/DocTitle'

const Restricted = () => {

  DocTitle('Restriced Page | Boobo')

  return (
    <Box h={'80vh'}>
      <AbsoluteCenter>
        <VStack>
        <Image w={'10rem'} borderRadius={'2xl'} src={BooBo_logo} className='bounce animated'/>
        <ThemedHeader text={'Restricted'} />
        <Text textAlign={'center'} fontSize={'lg'} fontFamily={'Poppins'}>Please sign in to access this feature</Text>
        </VStack>
      </AbsoluteCenter>
    </Box>
  )
}

export default Restricted