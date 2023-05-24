import React from 'react'
import ThemedHeader from '../components/ThemedHeader'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import { Box, Center } from '@chakra-ui/react'
import BookView from '../components/BookView'
import { BookViewType } from '../types'
import Footer from "../components/Footer";


const books: BookViewType[] = [{
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928227',
    description: 'Bilbo Baggins, a hobbit, is smoking in his porchway one day when Gandalf the Wizard visits him. He wants Bilbo to help a group of dwarves take back the Mountain from Smaug, a dragon. Bilbo is unsure he wants to help, but he is drawn in by some trickery on Gandalf\'s part and some flattering by the dwarves. He agrees to help, and they set off the next morning.',
    image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg',
    rating: 4.2,
    distance: 1.2
},
{
    title: 'The whatever else things',
    author: 'someone',
    isbn: '9700547928227',
    description: 'Something happens',
    image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg',
    rating: 4.2,
    distance: 1.2
},
{
    title: 'The whatever else things',
    author: 'someone',
    isbn: '9700547928227',
    description: 'Something happens',
    image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg',
    rating: 4.2,
    distance: 1.2
},
{
    title: 'The whatever else things',
    author: 'someone',
    isbn: '9700547928227',
    description: 'Something happens',
    image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg',
    rating: 4.2,
    distance: 1.2
},
{
    title: 'The whatever else things',
    author: 'someone',
    isbn: '9700547928227',
    description: 'Something happens',
    image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg',
    rating: 4.2,
    distance: 1.2
}]

const Home = () => {
  return (
    <>
    <Center>
        <Box w={{lg: '75%', md: '85%', sm: '100%'}}> 
        <SearchBar text='Search for a book...' />
        <FilterBar />
        <ThemedHeader text={'Results'} />
        <Box className='grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-7 pb-16'>
            {books.map((book) => (
                <BookView key={book.isbn} title={book.title} 
                author={book.author} isbn={book.isbn} 
                description={book.description.slice(0, 125) + "..."} 
                image={book.image} rating={book.rating} distance={book.distance} />
            ))}
        </Box>
        </Box>
    </Center>
    <Footer />
    </>
  )
}

export default Home