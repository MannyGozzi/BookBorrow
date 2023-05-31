import React from 'react'
import { Text } from '@chakra-ui/react'
import { TextType } from '../types.d'
import { useColorModeValue } from '@chakra-ui/react'

const ThemedHeader = ({ text }: TextType) => {
    return (
        <Text
            fontSize={'3xl'}
            className='theme-header'
            m={4}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {text}
        </Text>
    )
}

export default ThemedHeader