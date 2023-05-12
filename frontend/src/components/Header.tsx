import React from 'react'
import { Text } from '@chakra-ui/react'
import { TextType } from '../types'

const StyledHeader = ({ text }: TextType) => {
    return (
        <Text
            fontSize={'3xl'}
            className='theme-header'
            m={4}>
            {text}</Text>
    )
}

export default StyledHeader