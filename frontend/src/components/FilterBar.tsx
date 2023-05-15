import { Box, Center, FormControl, Input, Checkbox, CheckboxGroup, Stack, Flex,  NumberInput, NumberInputField, HStack, AbsoluteCenter } from '@chakra-ui/react'
import React from 'react'

const FilterBar = () => {
  return (
    <Center mt={4} >
      <Box rounded={'full'} bg={'gray.100'} w={'75%'} minHeight={'12'}>
      <FormControl>
            <Flex gap={5} pl={2} pr={2} justifyContent={'center'} pt={1}>
              <NumberInput>
                <NumberInputField placeholder='Distance' rounded={'full'}></NumberInputField>
              </NumberInput>
              <NumberInput>
                <NumberInputField placeholder='Rating' rounded={'full'}></NumberInputField>
              </NumberInput>
              <Checkbox defaultChecked>Hardcover</Checkbox>
              <Input type='text' placeholder='Genre' rounded={'full'}/>
            </Flex>
        </FormControl>  
      </Box>
    </Center>
  )
}

export default FilterBar