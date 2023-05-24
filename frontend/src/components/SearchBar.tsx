import { Box, Center, FormControl, Input } from '@chakra-ui/react'
import React from 'react'
import { TextType } from '../types.d'

const SearchBar = ({text} : TextType) => {
  return (
    <Center mt={4} m={3}>
        <Box w={{lg: '75%', md: '85%', sm: '100%'}}>
        <FormControl>
        <Input type='email' placeholder={text} rounded={'full'}/>
        </FormControl>
        </Box>
    </Center>
  )
}

export default SearchBar