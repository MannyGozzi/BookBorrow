import React, { useCallback, useMemo } from 'react'
import { IBook, ICheckout } from '../types'
import { Box, Center } from '@chakra-ui/react'
import BookInfo from '../components/BookInfo'
import axios from 'axios'
import { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import DocTitle from '../components/DocTitle'

const Profile = () => {
    const bookId =  new URLSearchParams(window.location.search).get('id');
    const [book, setBook] = useState<IBook | null>()
    const user = useSelector((state: any) => state.user)
    const [available, setAvailable] = useState<boolean>(true)

    useEffect(() => {
        axios.get(`http://localhost:3000/books/view/${bookId}`)
        .then(res => {
            setBook(res.data)
            setAvailable(res.data.available)
        })
        .catch(err => console.log(err.message))
    }, [])

    DocTitle('Book Page | Boobo')
    return (
        <Center>
            <Box w={{lg: '85%', md: '90%', sm: '100%'}}>
                {book && <BookInfo _id={book._id} lender={book.lender} title={book.title} 
                author={book.author} isbn={book.isbn} 
                description={book.description} 
                cover_image={book.cover_image} available={available} date_added={book.date_added} distance={5}/> 
                }
            </Box>
         </Center>
    )
}

export default Profile