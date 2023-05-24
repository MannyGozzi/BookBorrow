import { SearchIcon } from '@chakra-ui/icons'
import { HStack, Center, FormControl, useColorModeValue, Flex,  NumberInput, NumberInputField, FormLabel, Select, IconButton, Spacer } from '@chakra-ui/react'
import React from 'react'

const FilterBar = () => {
  return (
    <Center mt={4} m={3}>
      <HStack rounded={'3xl'} border={'1px solid'} borderColor={useColorModeValue('gray.200', 'gray.700')}  w={{lg: '75%', md: '85%', sm: '100%'}} p={0} m={0}>
      <FormControl>
        <Flex alignItems={'center'} columnGap={1} rowGap={2} flexWrap={'wrap'}>
            <HStack rounded={'full'} background={useColorModeValue('gray.100', 'gray.700')} pl={3} gap={3} spacing={'space-between'}>
              <FormLabel m={0} fontFamily={'Poppins'} fontWeight={'600'}>Style</FormLabel>
              <Select placeholder='Either' fontFamily={'Poppins'} variant={'filled'} background={useColorModeValue('gray.200', 'gray.600')} w={'5rm'} rounded={'full'}>
                <option>Hard Cover</option>
                <option>Soft Cover</option>
              </Select>
            </HStack>
            <Spacer />
            <HStack rounded={'full'} background={useColorModeValue('gray.100', 'gray.700')} pl={3} gap={3} spacing={'space-between'}>
              <FormLabel m={0} fontFamily={'Poppins'} fontWeight={'600'}>Genre</FormLabel>
              <Select placeholder='Any' fontFamily={'Poppins'} variant={'filled'} background={useColorModeValue('gray.200', 'gray.600')} w={'5rm'} rounded={'full'}>
                <option>Fiction</option>
                <option>Non-fiction</option>
              </Select>
            </HStack>
            <Spacer />
            <HStack rounded={'full'} background={useColorModeValue('gray.100', 'gray.700')} pl={3} gap={3} spacing={'space-between'}>
              <FormLabel m={0} fontFamily={'Poppins'} fontWeight={'600'}>Distance</FormLabel>
              <NumberInput defaultValue={15}>
                <NumberInputField w={'5rem'} fontFamily={'Poppins'} background={useColorModeValue('gray.200', 'gray.600')} rounded={'full'} />
              </NumberInput>
            </HStack>
            <Spacer />
            <IconButton type='submit' rounded={'full'} aria-label='Search database' icon={<SearchIcon />} />
          </Flex>
        </FormControl>
      </HStack>
    </Center>
  )
}

export default FilterBar