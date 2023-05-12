import React from 'react'
import UserBook, {UserBookType} from '../components/UserBook'

const userBooks: UserBookType[] = [{
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928227',
    description: 'Bilbo Baggins, a hobbit, is smoking in his porchway one day when Gandalf the Wizard visits him. He wants Bilbo to help a group of dwarves take back the Mountain from Smaug, a dragon. Bilbo is unsure he wants to help, but he is drawn in by some trickery on Gandalf\'s part and some flattering by the dwarves. He agrees to help, and they set off the next morning.',
    image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg'
},
{
    title: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928210',
    description: 'The Fellowship of the Ring is the first of three volumes of the epic novel The Lord of the Rings by the English author J. R. R. Tolkien. It is followed by The Two Towers and The Return of the King.',
    image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg'
},
{
    title: 'Another book title',
    author: 'Some dude',
    isbn: '0000547928210',
    description: 'A book about stuff and things',
    image: 'https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
},
{
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928227',
    description: 'Bilbo Baggins, a hobbit, is smoking in his porchway one day when Gandalf the Wizard visits him. He wants Bilbo to help a group of dwarves take back the Mountain from Smaug, a dragon. Bilbo is unsure he wants to help, but he is drawn in by some trickery on Gandalf\'s part and some flattering by the dwarves. He agrees to help, and they set off the next morning.',
    image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg'
},
{
    title: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928210',
    description: 'The Fellowship of the Ring is the first of three volumes of the epic novel The Lord of the Rings by the English author J. R. R. Tolkien. It is followed by The Two Towers and The Return of the King.',
    image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg'
},
{
    title: 'Another book title',
    author: 'Some dude',
    isbn: '0000547928210',
    description: 'A book about stuff and things',
    image: 'https://images.pexels.com/photos/1183434/pexels-photo-1183434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
}]

const Profile = () => {
    return (
        <section className='flex justify-center'>
            <div className='grid grid-cols-3 w-4/5 gap-7'>
                {userBooks.map((book, index) => (
                    <UserBook key={index} title={book.title} author={book.author} isbn={book.isbn} description={book.description} image={book.image} />
                ))}
            </div>
        </section>
    )
}

export default Profile