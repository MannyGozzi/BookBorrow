import React, { useEffect, useState } from 'react'
import ThemedHeader from '../components/ThemedHeader'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import { Box, Button, Center } from '@chakra-ui/react'
import BookView from '../components/BookView'
import { BookViewType } from '../types.d'
import Footer from "../components/Footer";


const bookViews: BookViewType[] = [
  {
  title: 'The Hobbit',
  author: 'J.R.R. Tolkien',
  isbn: '9780547928227',
  description: 'Bilbo Baggins, a hobbit, is smoking in his porchway one day when Gandalf the Wizard visits him. He wants Bilbo to help a group of dwarves take back the Mountain from Smaug, a dragon. Bilbo is unsure he wants to help, but he is drawn in by some trickery on Gandalf\'s part and some flattering by the dwarves. He agrees to help, and they set off the next morning.',
  image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg',
  rating: 4.2, // *** lender rating ***
  distance: 1.2
  },
  {
  title: 'Stuff',
  author: 'A person',
  isbn: '9700547928227',
  description: 'Things',
  image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg',
  rating: 4.2,
  distance: 5.2
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
  rating: 3.5,
  distance: 1.2
  },
  {
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
  rating: 0,
  distance: 1.2
  },
  {
  title: 'The whatever else things',
  author: 'someone',
  isbn: '9700547928227',
  description: 'Something happens',
  image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg',
  rating: 3.5,
  distance: 1.2
  },
  {
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
  rating: 0,
  distance: 1.2
  },
  {
  title: 'The Hobbit 2',
  author: 'J.R.R. Tolkien',
  isbn: '9780547928227',
  description: 'Bilbo Baggins, a hobbit, is smoking in his porchway one day when Gandalf the Wizard visits him. He wants Bilbo to help a group of dwarves take back the Mountain from Smaug, a dragon. Bilbo is unsure he wants to help, but he is drawn in by some trickery on Gandalf\'s part and some flattering by the dwarves. He agrees to help, and they set off the next morning.',
  image: 'https://images.pexels.com/photos/2203051/pexels-photo-2203051.jpeg',
  rating: 5, 
  distance: 12
  }
]

const displaySize = 6; 

const Home = () => {
  const [next, setNext] = useState(displaySize);
  const [loader, setLoader] = useState(false);
  // const [bookViews, setBookViews] = useState<BookViewType[]>([]);

  // useEffect(() => {
  //   fetch("http://api.example.com/v1")
  //     .then(response => response.json())
  //     .then(data => setBookViews(data))
  //     .catch(error => console.error(error));
  // }, []);

  const sortedBookViews = [...bookViews].sort((a, b) => a.distance - b.distance);

  const handleMoreBooks  = () => {
    setLoader(true);
    setNext(next + displaySize);
    setTimeout(() => setLoader(false), 1000);
    // setLoader(false);
    };

  return (
    <>
    <Center>
        <Box w={{lg: '75%', md: '85%', sm: '100%'}}> 
        <SearchBar text='Search for a book...' />
        <FilterBar />
        <ThemedHeader text={'Results'} />
        <Box className='grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-7 pb-16'>
            {sortedBookViews.slice(0, next).map((book) => (
                <BookView key={book.isbn} title={book.title} 
                author={book.author} isbn={book.isbn} 
                description={book.description.slice(0, 125) + "..."} 
                image={book.image} rating={book.rating} distance={book.distance} />
            ))}
        </Box>
        </Box>
    </Center>
    <Center>
        <Button
            variant={'solid'}
            background={'red.200'}
            size={'lg'}
            rounded={'xl'}
            mb={14}
            fontFamily={'Poppins'}
            isLoading={loader}
            disabled={loader}
            onClick={handleMoreBooks}>
            Load More
        </Button>
    </Center>
    <Footer />
    </>
  )
}

export default Home