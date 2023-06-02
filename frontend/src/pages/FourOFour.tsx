import React from 'react'
import ThemedHeader from '../components/ThemedHeader'
import { AbsoluteCenter, Image, VStack, Box, Text } from '@chakra-ui/react'
import BooBo_logo from '../assets/BooBo_logo.png'
import DocTitle from '../components/DocTitle'

const FourOFour = () => {
  DocTitle("404 Page | Boobo")
  return (
    <Box h={'80vh'}>
      <AbsoluteCenter>
        <VStack>
        <Image w={'10rem'} borderRadius={'2xl'} src={BooBo_logo} className='bounce animated'/>
        <ThemedHeader text={'404'} />
        <Text fontSize={'lg'} fontFamily={'Poppins'}>We couldn't find what you're looking for</Text>
        </VStack>
      </AbsoluteCenter>
    </Box>
  )
}

export default FourOFour