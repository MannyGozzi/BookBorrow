import React, { useEffect, useState } from 'react'
import ThemedHeader from '../components/ThemedHeader'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import { Box, Button, Center, useColorModeValue } from '@chakra-ui/react'
import BookView from '../components/BookView'
import { IBookView } from '../types.d'
import Footer from "../components/Footer";
import { setBooks } from '../actions/bookActions'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'


const Home = () => {
  const pageCount = 10
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch()
  // const [bookViews, setBookViews] = useState<BookViewType[]>([]);

  // useEffect(() => {
  //   fetch("http://api.example.com/v1")
  //     .then(response => response.json())
  //     .then(data => setBookViews(data))
  //     .catch(error => console.error(error));
  // }, []);

  // TODO, CALCULATE ACTUAL DISTANC FROM USER
  const addDistanceToBooks = (books: IBookView[]) => {
    const newBooks = books.map(book => {
      const distance = Math.random() * 20;
      return {...book, distance}
    })
    return newBooks
  }

  const refreshBooks = () => {
    axios.get('http://localhost:3000/books', 
    { params: {
      pageNumber: page,
      searchTerm: ''
    }})
      .then(response => {
        dispatch(setBooks(addDistanceToBooks(response.data.books)))

      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    refreshBooks()
  }, [])

  const sortBooks = (books: IBookView[]) => [...books].sort((a, b) => a.distance - b.distance)
  let books: IBookView[] = useSelector((state: any) => state.books)
  books = sortBooks(books)

  const handleMoreBooks  = () => {
    setLoader(true);
    setPage(page + 1);
    setTimeout(() => setLoader(false), 1000);
    };

  return (
    <>
    <Center>
        <Box w={{lg: '85%', md: '90%', sm: '100%'}}>
        <SearchBar text='Search for a book...' />
        <FilterBar />
        <ThemedHeader text={'Results'} />
        <Box className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-7 pb-16'>
            {books.slice(0, page*pageCount).map((book, index) => (
                <BookView _id={book._id} lender={book.lender} key={index} title={book.title} 
                author={book.author} isbn={book.isbn} 
                description={book.description?.slice(0, 125) + "..."} 
                cover_image={book.cover_image} distance={book.distance} available={book.available} date_added={book.date_added} zip_code={book.zip_code}/>
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