import { Box, Center, FormControl, Input, Checkbox, CheckboxGroup, Stack, NumberInput, NumberInputField, HStack, AbsoluteCenter } from '@chakra-ui/react'
import React from 'react'

const FilterBar = () => {
  return (
    <Center mt={4}>
      <FormControl bg={'gray.100'} w={'75%'} rounded={'full'}  h={10} >
        <AbsoluteCenter>
          <HStack spacing={5} >
            <NumberInput>
              <NumberInputField placeholder='Distance' rounded={'full'}></NumberInputField>
            </NumberInput>
            <NumberInput>
              <NumberInputField placeholder='Rating' rounded={'full'}></NumberInputField>
            </NumberInput>
              <Checkbox defaultChecked>Hardcover</Checkbox>
          </HStack>
        </AbsoluteCenter >
      </FormControl>
    </Center>
  )
}

export default FilterBar