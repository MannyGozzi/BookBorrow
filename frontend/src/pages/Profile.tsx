import React from 'react'
import UserBook from '../components/UserBook'
import { IBook, ICheckout } from '../types.d'
import ThemedHeader from '../components/ThemedHeader'
import { Box, Center, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import ProfileInfo from '../components/ProfileInfo'
import Restricted from './Restricted'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { setBooks } from '../actions/bookActions'
import BookCheckout from '../components/BookCheckout'
import BookConfirmCheckout from '../components/BookConfirmCheckout'
import BookView from '../components/BookView'
import BookBorrowed from '../components/BookBorrowed'
import DocTitle from '../components/DocTitle'
import { IUser } from '../types.d'
import { setReviews } from '../actions/reviewActions'
import Review from '../components/Review'
// import { setCurrentUser } from '../actions/userActions'

const Profile = () => {
    const user = useSelector((state: any) => state.user)
    const [userReviews, setUserReviews] = useState([]);
    const [currentlyBorrowing, setCurrentlyBorrowing] = useState<IBook[]>([])
    const [confirmCheckouts, setConfirmCheckouts] = useState<ICheckout[]>([])
    const [currentlyBorrowed, setCurrentlyBorrowed] = useState<ICheckout[]>([])
    const dispatch = useDispatch()
    const reduxBooks = useSelector((state: any) => state.books)
    // const reduxReviews = useSelector((state: any) => state.reviews);
    let userId = new URLSearchParams(window.location.search).get('userid');
    const isLocalUser = !userId
    if (!userId) userId = user?._id

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${userId}`)
            .then(res => {
                dispatch(setBooks(res.data.books))
                // dispatch(setReviews(res.data.reviews))
                // setUserReviews(res.data.reviews)

            })
            .catch(err => console.log(err.message))
        
        axios.get(`http://localhost:3000/reviews/${userId}`)
            .then(res => {
                dispatch(setReviews(res.data.reviews))
                setUserReviews(res.data.reviews)
            })
            
        if (isLocalUser) axios.get(`http://localhost:3000/checkout/by/${userId}`, { withCredentials: true })
            .then(res => {
                // a book is checked out once the due_date is set by the owner
                setCurrentlyBorrowing(res.data.filter((checkout: any) => !checkout.returned && checkout.approved))
            })
            .catch(() => setCurrentlyBorrowing([]))
        
        if (isLocalUser)
            axios.get(`http://localhost:3000/checkout/from/${userId}`, { withCredentials: true })
                .then(res => {
                    // a book is checked out once the due_date is set by the owner
                    setConfirmCheckouts(res.data.filter((checkout: any) => !checkout.approved))
                })
                .catch(() => setConfirmCheckouts([]))

        if (isLocalUser)
            axios.get(`http://localhost:3000/checkout/by/${userId}`, { withCredentials: true })
                .then(res => {
                    // a book is checked out once the due_date is set by the owner
                    setCurrentlyBorrowed(res.data.filter((checkout: any) => !checkout.returned))
                })
                .catch(() => setCurrentlyBorrowed([]))
    }, [])

    DocTitle("Your Profile Page | Boobo")
    return (
        <Center>
            {userId &&
                <Box w={{ lg: '85%', md: '90%', sm: '100%' }}>
                    <ProfileInfo userid={userId ?? ''} isLocalUser={isLocalUser} />
                    {reduxBooks.length > 0 && <ThemedHeader text={'Books'} />}
                    <Tabs isFitted variant='enclosed' h={'100vh'}>
                        <TabList mb='1em'>
                            <Tab>Books</Tab>
                            {/* User's profile */}
                            {isLocalUser && <Tab>Currently Borrowed</Tab>}
                            {isLocalUser && <Tab>Borrow Requests</Tab>}
                            {isLocalUser && <Tab>Checkouts</Tab>}
                            <Tab>Reviews</Tab>
                            {/* {isLocalUser && <Tab>Reviews</Tab>} */}
                            {/* Other profiles */}
                            {/* {!isLocalUser && <Tab>Reviews</Tab>} */}
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Box className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-7 pb-16'>
                                    {reduxBooks?.map((book: any, index: any) => (
                                        (!isLocalUser ? <BookView key={index} distance={0} title={book.title?.slice(0, 35) + (book.title.length > 35 ? '...' : '')} author={book.author} isbn={book?.isbn} description={book.description.slice(0, 100) + (book.description.length > 100 ? '...' : '')} cover_image={book?.cover_image} lender={book.lender} _id={book._id} date_added={book.date_added} available={book.available} />
                                            : <UserBook key={index} distance={0} title={book.title?.slice(0, 35) + (book.title.length > 35 ? '...' : '')} author={book.author} isbn={book?.isbn} description={book.description.slice(0, 100) + (book.description.length > 100 ? '...' : '')} cover_image={book?.cover_image} lender={book.lender} _id={book._id} date_added={book.date_added} available={book.available} />)
                                    ))}
                                </Box>
                            </TabPanel>
                            {isLocalUser && <TabPanel>
                                <Box className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-7 pb-16'>
                                    {currentlyBorrowing?.map((checkout: any, index: any) => (
                                        <BookCheckout key={index} {...checkout} />
                                    ))}
                                </Box>
                            </TabPanel>}
                            {isLocalUser && <TabPanel>
                                <Box className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-7 pb-16'>
                                    {confirmCheckouts?.map((checkout: any, index: any) => (
                                        <BookConfirmCheckout key={index} {...checkout} />
                                    ))}
                                </Box>
                            </TabPanel>}
                            {isLocalUser && <TabPanel>
                                <Box className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-7 pb-16'>
                                    {currentlyBorrowed?.map((checkout: any, index: any) => (
                                        <BookBorrowed key={index} {...checkout} />
                                    ))}
                                </Box>
                            </TabPanel>}
                            {<TabPanel>
                                <Box className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-7 pb-16'>
                                    {userReviews?.map((review: any, index: any) => (
                                        <Review
                                        key={index}
                                        _id={review._id}
                                        reviewer={review.reviewer}
                                        reviewed={review.reviewed}
                                        rating={review.rating}
                                        comment={review.comment}
                                        date_created={review.date_created}
                                      />
                                    ))}
                                </Box>
                            </TabPanel>}
                        </TabPanels>

                    </Tabs>
                </Box>}
            {!userId && <Restricted />}
        </Center>
    )
}

export default Profile