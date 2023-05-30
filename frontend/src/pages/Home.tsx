import React, { useEffect, useState } from 'react'
import ThemedHeader from '../components/ThemedHeader'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import { Box, Button, Center, useColorModeValue } from '@chakra-ui/react'
import BookView from '../components/BookView'
import { IBookView, IBook } from '../types.d'
import Footer from "../components/Footer";
import { addBook, setBooks } from '../actions/bookActions'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'


const Home = () => {
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

  const addDistanceToBook = (book: IBookView) => {
    const distance = Math.random() * 20;
    return {...book, distance}
  }

  const initBooksPage = (pageNum: number) => {
    axios.get(`http://localhost:3000/books`, 
    { params: {
      pageNumber: page,
      searchTerm: ''
    }})
      .then(response => {
        dispatch(setBooks([]))
        response.data.books.forEach((book: IBookView) => {
          dispatch(addBook(addDistanceToBook(book)))
        });
      })
      .catch(error => console.error(error))
  }

  const getBooksPage = (pageNum: number) => {
    axios.get(`http://localhost:3000/books`, 
    { params: {
      pageNumber: pageNum,
      searchTerm: ''
    }})
      .then(response => {
        response.data.books.forEach((book: IBookView) => {
          dispatch(addBook(addDistanceToBook(book)))
        });

      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    initBooksPage(page)
  }, [])

  //const sortBooks = (books: IBookView[]) => [...books].sort((a, b) => a.distance - b.distance)
  let books: IBookView[] = useSelector((state: any) => state.books)

  const handleMoreBooks  = async () => {
    setLoader(true);
    getBooksPage(page + 1)
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
            {books.map((book, index) => (
                <BookView _id={book._id} lender={book.lender} key={index} title={book.title.slice(0, 35) + (book.title.length > 35 ? '...' : '')} 
                author={book.author} isbn={book.isbn} 
                description={book.description?.slice(0, 80) + "..."} 
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