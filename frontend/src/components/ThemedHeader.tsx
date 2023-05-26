import React from 'react'
import { Text } from '@chakra-ui/react'
import { TextType } from '../types'

const ThemedHeader = ({ text }: TextType) => {
    return (
        <Text
            fontSize={'3xl'}
            className='theme-header'
            m={4}
            color={'gray.600'}>
            {text}
        </Text>
    )
}

export default ThemedHeader