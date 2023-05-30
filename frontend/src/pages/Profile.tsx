import React from 'react'
import UserBook from '../components/UserBook'
import { IBook } from '../types.d'
import ThemedHeader from '../components/ThemedHeader'
import { Box, Center } from '@chakra-ui/react'
import ProfileInfo from '../components/ProfileInfo'
import Restricted from './Restricted'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { setBooks } from '../actions/bookActions'
import BookCheckout from '../components/BookCheckout'

const Profile = () => {
    const user = useSelector((state: any) => state.user)
    const bookId =  new URLSearchParams(window.location.search).get('id');
    const [currentlyBorrowing, setCurrentlyBorrowing] = useState<IBook[]>([])
    const dispatch = useDispatch()
    const reduxBooks = useSelector((state: any) => state.books)
    const userId = new URLSearchParams(window.location.search).get('userid');


    useEffect(() => {
        axios.get(`http://localhost:3000/users/${userId ? userId : user._id}`)
        .then(res => {
            dispatch(setBooks(res.data.books))
        })
        .catch(err => console.log(err.message))

        if (!userId && user._id) axios.get(`http://localhost:3000/checkout/from/${user._id}`, {withCredentials: true})
            .then(res => {
                console.log(res.data)
                setCurrentlyBorrowing(res.data)
            })
            .catch(() => setCurrentlyBorrowing([]))
    }, [])

    return (
        <Center>
            {user && user._id && 
            <Box w={{lg: '85%', md: '90%', sm: '100%'}}>
                <ProfileInfo userId={userId ? userId : user._id} /> 
                <ThemedHeader text={'Books'}/>
                <Box className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-7 pb-16'>
                    {reduxBooks?.map((book: any, index: any) => (
                        <UserBook key={index} title={book.title?.slice(0, 35) + (book.title.length>35 ? '...' : '')} author={book.author} isbn={book?.isbn} description={book.description.slice(0, 100) + (book.description.length>100 ? '...' : '')} cover_image={book?.cover_image} lender={book.lender} _id={book._id} zip_code={book.zip_code} date_added={book.date_added} available={book.available}/>
                    ))}
                </Box>
                {currentlyBorrowing.length > 0 && 
                <>
                    <ThemedHeader text={'Currently Borrowing'}/>
                    <Box className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-7 pb-16'>
                        {currentlyBorrowing?.map((checkout: any, index: any) => (
                            checkout.returned ? null : <BookCheckout key={index} {...checkout}  />
                        ))}
                    </Box>
                </>}
            </Box>}
            {!user && <Restricted />}
         </Center>
    )
}

export default Profile