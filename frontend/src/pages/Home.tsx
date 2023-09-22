import React, { useCallback, useEffect, useState } from 'react'
import ThemedHeader from '../components/ThemedHeader'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import { Box, Button, Center } from '@chakra-ui/react'
import BookView from '../components/BookView'
import { IBookView, IBook } from '../types.d'
import Footer from "../components/Footer";
import { addBook, setBooks } from '../actions/bookActions'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import DocTitle from '../components/DocTitle'

const Home = () => {
  const [page, setPage] = useState(1);
  const [morePages, setMorePages] = useState(true);
  const [loader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch = useDispatch()
  // const [bookViews, setBookViews] = useState<BookViewType[]>([]);

  // useEffect(() => {
  //   fetch("http://api.example.com/v1")
  //     .then(response => response.json())
  //     .then(data => setBookViews(data))
  //     .catch(error => console.error(error));
  // }, []);

  const initBooksPage = useCallback(() => {
    setPage(1)
    axios.get(`http://localhost:3000/books`, 
    { params: {
      pageNumber: 1,
      searchTerm: searchQuery
    }})
      .then(response => {
        const { books, currentPage, pages} = response.data;
        setMorePages(pages > currentPage)
        dispatch(setBooks([]))
        books.forEach((book: IBookView) => {
          dispatch(addBook(book))
        });
      })
      .catch(error => console.error(error))
  }, [searchQuery, dispatch])

  const getBooksPage = useCallback((pageNum: number) => {
    axios.get(`http://localhost:3000/books`, 
    { params: {
      pageNumber: pageNum,
      searchTerm: searchQuery
    }})
      .then(response => {
        const { books, currentPage, pages} = response.data;
        setMorePages(pages > currentPage)
        books.forEach((book: IBookView) => {
          dispatch(addBook(book))
        });

      })
      .catch(error => console.error(error))
  }, [searchQuery, dispatch])

  useEffect(() => {
    initBooksPage()
  }, [searchQuery])

  //const sortBooks = (books: IBookView[]) => [...books].sort((a, b) => a.distance - b.distance)
  let books: IBookView[] = useSelector((state: any) => state.books)

  const handleMoreBooks  = async () => {
    setLoader(true);
    getBooksPage(page + 1)
    setPage(page + 1);
    setTimeout(() => setLoader(false), 1000);
  };
  DocTitle("Home Page | Boobo")
  return (
    <>
    <Center>
        <Box w={{lg: '85%', md: '90%', sm: '100%'}}>
        <SearchBar text='Search for a book...' onChange={setSearchQuery} value={searchQuery} />
        <ThemedHeader text={'Results'} />
        <Box className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-7 pb-16'>
            {books.map((book, index) => (
                <BookView _id={book._id} lender={book.lender} key={index} title={book.title.slice(0, 35) + (book.title.length > 35 ? '...' : '')} 
                author={book.author} isbn={book.isbn} 
                description={book.description?.slice(0, 80) + "..."} 
                cover_image={book.cover_image} distance={book.distance} available={book.available} date_added={book.date_added}/>
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
            isDisabled={loader || !morePages}
            onClick={handleMoreBooks}>
            {morePages ? "Load More" : "No More Books"}
        </Button>
    </Center>
    <Footer />
    </>
  )
}

export default Home