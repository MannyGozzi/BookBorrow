import React from 'react'
import UserBook from '../components/UserBook'
import { UserBookType } from '../types'
import ThemedHeader from '../components/ThemedHeader'
import { Stack, Box, Center } from '@chakra-ui/react'
import ProfileInfo from '../components/ProfileInfo'

// TODO: Replace user books with API call to get the owner's uploaded books
const userBooks: UserBookType[] = [{
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928227',
    description: 'Bilbo Baggins, a hobbit, is smoking in his porchway one day when Gandalf the Wizard visits him. He wants Bilbo to help a group of dwarves take back the Mountain from Smaug, a dragon. Bilbo is unsure he wants to help, but he is drawn in by some trickery on Gandalf\'s part and some flattering by the dwarves. He agrees to help, and they set off the next morning.',
    image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg',
    rating: 4.2
},
{
    title: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928210',
    description: 'The Fellowship of the Ring is the first of three volumes of the epic novel The Lord of the Rings by the English author J. R. R. Tolkien. It is followed by The Two Towers and The Return of the King.',
    image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg',
    rating: 3.1
},
{
    title: 'Another book title',
    author: 'Some dude',
    isbn: '0000547928210',
    description: 'A book about stuff and things',
    image: 'https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 5.0
}]

const userBooksRequested: UserBookType[] = [{
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928227',
    description: 'Bilbo Baggins, a hobbit, is smoking in his porchway one day when Gandalf the Wizard visits him. He wants Bilbo to help a group of dwarves take back the Mountain from Smaug, a dragon. Bilbo is unsure he wants to help, but he is drawn in by some trickery on Gandalf\'s part and some flattering by the dwarves. He agrees to help, and they set off the next morning.',
    image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg',
    rating: 4.2
}]


const userBooksBorrowed: UserBookType[] = [{
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928227',
    description: 'Bilbo Baggins, a hobbit, is smoking in his porchway one day when Gandalf the Wizard visits him. He wants Bilbo to help a group of dwarves take back the Mountain from Smaug, a dragon. Bilbo is unsure he wants to help, but he is drawn in by some trickery on Gandalf\'s part and some flattering by the dwarves. He agrees to help, and they set off the next morning.',
    image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg',
    rating: 4.2
},
{
    title: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928210',
    description: 'The Fellowship of the Ring is the first of three volumes of the epic novel The Lord of the Rings by the English author J. R. R. Tolkien. It is followed by The Two Towers and The Return of the King.',
    image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg',
    rating: 3.1
}]

const Profile = () => {
    return (
        <Box className='w-full'>
            <Stack spacing='50px'>
                <ProfileInfo/>
                <ThemedHeader text={'Books You Lended'}/>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-7'>
                    {userBooks.map((book) => (
                        <UserBook key={book.isbn} title={book.title} author={book.author} isbn={book.isbn} description={book.description.slice(0, 125) + "..."} image={book.image} rating={book.rating} />
                    ))}
                </div>
                <ThemedHeader text={'Books You Requested'} />
                <div className='grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-7'>
                    {userBooksRequested.map((book) => (
                        <UserBook key={book.isbn} title={book.title} author={book.author} isbn={book.isbn} description={book.description.slice(0, 125) + "..."} image={book.image} rating={book.rating} />
                    ))}
                </div>
                <ThemedHeader text={'Books You Borrowed'} />
                <div className='grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-7'>
                    {userBooksBorrowed.map((book) => (
                        <UserBook key={book.isbn} title={book.title} author={book.author} isbn={book.isbn} description={book.description.slice(0, 125) + "..."} image={book.image} rating={book.rating} />
                    ))}
                </div>
            </Stack>
        </Box>
    )
}

export default Profile