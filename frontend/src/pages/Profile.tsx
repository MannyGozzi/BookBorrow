import React from 'react'
import UserBook from '../components/UserBook'
import { IBook, ICheckout } from '../types.d'
import ThemedHeader from '../components/ThemedHeader'
import { Box, Center } from '@chakra-ui/react'
import ProfileInfo from '../components/ProfileInfo'
import Restricted from './Restricted'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { setBooks } from '../actions/bookActions'
import BookCheckout from '../components/BookCheckout'
import BookConfirmCheckout from '../components/BookConfirmCheckout'
import BookView from '../components/BookView'
import BookBorrowed from '../components/BookBorrowed'
import DocTitle from '../components/DocTitle'
import { IUser } from '../types.d'
// import { setCurrentUser } from '../actions/userActions'

const Profile = () => {
    const user = useSelector((state: any) => state.user)
    // const [currentUser, setUser] = useState<IUser>();
    const [currentlyBorrowing, setCurrentlyBorrowing] = useState<IBook[]>([])
    const [confirmCheckouts, setConfirmCheckouts] = useState<ICheckout[]>([])
    const [currentlyBorrowed, setCurrentlyBorrowed] = useState<ICheckout[]>([])
    const dispatch = useDispatch()
    const reduxBooks = useSelector((state: any) => state.books)
    const userId = new URLSearchParams(window.location.search).get('userid');

    
    useEffect(() => {
        // axios.get(`http://localhost:3000/users/${userId}`)
        // .then(res => {
        //     dispatch(setCurrentUser(res.data.user))
        //     setUser(res.data.user)
        // })
        // .catch(err => console.log(err.message))

        axios.get(`http://localhost:3000/users/${userId ? userId : user._id}`)
        .then(res => {
            dispatch(setBooks(res.data.books))
        })
        .catch(err => console.log(err.message))

        if (!userId && user._id) axios.get(`http://localhost:3000/checkout/by/${user._id}`, {withCredentials: true})
            .then(res => {
                // a book is checked out once the due_date is set by the owner
                setCurrentlyBorrowing(res.data.filter((checkout: any) => !checkout.returned && checkout.approved))
            })
            .catch(() => setCurrentlyBorrowing([]))
        
        if (user && user._id && (userId === user._id || !userId)) 
            axios.get(`http://localhost:3000/checkout/from/${user._id}`, {withCredentials: true})
            .then(res => {
                // a book is checked out once the due_date is set by the owner
                setConfirmCheckouts(res.data.filter((checkout: any) => !checkout.approved))
                setCurrentlyBorrowed(res.data.filter((checkout: any) => checkout.approved && !checkout.returned))
            })
            .catch(() => setConfirmCheckouts([]))
    }, [])

    DocTitle("Your Profile Page | Boobo")
    return (
        <Center>
            {user && user._id && 
            <Box w={{lg: '85%', md: '90%', sm: '100%'}}>
                <ProfileInfo userId={userId ? userId : user._id} isLocalUser={!userId}/> 
                {reduxBooks.length > 0 && <ThemedHeader text={'Books'}/>}
                <Box className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-7 pb-16'>
                    {reduxBooks?.map((book: any, index: any) => (
                        (userId ? <BookView key={index} distance={0} title={book.title?.slice(0, 35) + (book.title.length>35 ? '...' : '')} author={book.author} isbn={book?.isbn} description={book.description.slice(0, 100) + (book.description.length>100 ? '...' : '')} cover_image={book?.cover_image} lender={book.lender} _id={book._id} date_added={book.date_added} available={book.available}/>
                        : <UserBook key={index} distance={0} title={book.title?.slice(0, 35) + (book.title.length>35 ? '...' : '')} author={book.author} isbn={book?.isbn} description={book.description.slice(0, 100) + (book.description.length>100 ? '...' : '')} cover_image={book?.cover_image} lender={book.lender} _id={book._id}  date_added={book.date_added} available={book.available}/>)
                    ))}
                </Box>
                {currentlyBorrowing.length > 0 && 
                <>
                    <ThemedHeader text={'Currently Borrowing'}/>
                    <Box className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-7 pb-16'>
                        {currentlyBorrowing?.map((checkout: any, index: any) => (
                            <BookCheckout key={index} {...checkout} />
                        ))}
                    </Box>
                </>}
                {confirmCheckouts.length > 0 && <>
                    <ThemedHeader text={'Borrow Requests'}/>
                    <Box className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-7 pb-16'>
                        {confirmCheckouts?.map((checkout: any, index: any) => (
                            <BookConfirmCheckout key={index} {...checkout} />
                        ))}
                    </Box>
                </>}
                {currentlyBorrowed.length > 0 && <>
                    <ThemedHeader text={'Currently Borrowed'}/>
                    <Box className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-7 pb-16'>
                        {currentlyBorrowed?.map((checkout: any, index: any) => (
                            <BookBorrowed key={index} {...checkout} />
                        ))}
                    </Box>
                </>}
            </Box>}
            {!user && <Restricted />}
         </Center>
    )
}

export default Profile