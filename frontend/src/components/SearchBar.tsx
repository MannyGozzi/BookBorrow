import { Box, Center, FormControl, Input } from '@chakra-ui/react'
import { SearchBarProps } from '../types.d'

const SearchBar = ({text, value, onChange} : SearchBarProps) => {
  return (
    <Center mt={4} m={3}>
        <Box w={'100%'}>
        <FormControl>
        <Input type='text' value={value} onChange={(event) => onChange(event.target.value)} placeholder={text} rounded={'full'} fontFamily={'Poppins'}/>
        </FormControl>
        </Box>
    </Center>
  )
}

export default SearchBar