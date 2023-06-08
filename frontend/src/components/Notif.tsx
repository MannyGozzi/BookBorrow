import { useColorModeValue, Box, Text } from '@chakra-ui/react'
import React from 'react'

interface NotifProps {
  count: number
}

const Notif = ({ count }: NotifProps) => {
  const bg = useColorModeValue('red.300', 'green.100')
  const color = useColorModeValue('gray.50', 'gray.800')
  const something = (count > 0) ?
    <Box bg={bg} fontFamily={'Poppins'} fontWeight={'bold'} color={color}
      className='w-6 h-6 rounded-full flex items-center justify-center mx-3'>
      <Text>{count}</Text>
    </Box>
    : <></>
  return (
    something
  )
}

export default Notif