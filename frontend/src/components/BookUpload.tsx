import {
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  useDisclosure,
  Box,
  useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'
// import { search } from '@chewhx/google-books'
import ImageUpload from './ImageUpload'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addBook } from '../actions/bookActions'
const defaultImage: string = "https://media.istockphoto.com/id/1292243602/vector/book-vector-icon-isolated-closed-book-notebook-with-orange-cover-flat-colored-illustration.jpg?s=170667a&w=0&k=20&c=dLB7CeqXUIw0bofaJ83F33dKVECyM7UUHKM0jdYUR2E="

const BookUpload = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [isbn, setIsbn] = useState<string>('')
  const [publication_date, setPublication_date] = useState<Date | null>()
  const [genre, setGenre] = useState<string>('')
  const [cover_image, setCover_image] = useState<File | null | string>()
  const [description, setDescription] = useState<string>('')
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const toast = useToast()
  
  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     if (!title) return;
  //     search(title)
  //       .then(res => {
  //         console.log(res);
  //       })
  //   }, 1000)

  //   return () => clearTimeout(delayDebounceFn)
  // }, [title])

  const submit = async () => {
    const image = cover_image ? cover_image : defaultImage
    axios.post('http://localhost:3000/books',
      { title, author, isbn, publication_date, genre, cover_image: image, description, userId: user._id }, 
      { withCredentials: true })
      .then(response => {
        dispatch(addBook(response.data))
        toast({
          title: 'Upload Success! 🔥',
          description: "Your book has been uploaded!",
          status: 'success',
          duration: 7000,
          isClosable: true,
        })
        onClose()
      })
      .catch((error) => {
        console.log(error)
        if (error.response?.data?.msg) {
          toast({
            title: 'Upload Failed! 😔',
            description: error.response?.data?.msg,
            status: 'error',
            duration: 7000,
            isClosable: true,
          })
        } else {
          toast({
            title: 'Upload Failed! 😔',
            description: "Error uploading book.",
            status: 'error',
            duration: 7000,
            isClosable: true,
          })
        }
      })
  }

  return (
    <>
      <Button mt={4} onClick={onOpen} rounded={'xl'} size={'md'}>
        <Center>
          Upload Book
        </Center>
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={'100%'}>
          <ModalHeader>
            <Center>
              <span className='theme-header'>Book Upload</span>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} w={'100%'}>
            <Heading>
              <Center>
                <Box height="100%" display="flex" alignItems="center" justifyContent="center">
                  <Center width="100%" height="100%">
                    <ImageUpload retrieveImage={setCover_image}/>
                  </Center>
                </Box>
              </Center>
            </Heading>

            <Heading size='sm'>Title</Heading>
            <FormControl>
              <Input ref={initialRef} onChange={(event) => setTitle(event.target.value)} placeholder='Book Title' />
            </FormControl>

            <Heading size='sm'>Author</Heading>
            <FormControl mt={4}>
              <Input placeholder='Book Author' onChange={(event) => setAuthor(event.target.value)}/>
            </FormControl>

            <Heading size='sm'>ISBN</Heading>
            <FormControl mt={4}>
              <Input placeholder='ISBN' onChange={(event) => setIsbn(event.target.value)}/>
            </FormControl>

            <Heading size='sm'>Publication Date</Heading>
            <FormControl mt={4}>
              <Input type='DATE' placeholder='01/01/2023' onChange={(event) => setPublication_date(event.target.valueAsDate)}/>
            </FormControl>

            <Heading size='sm'>Genre</Heading>
            <Select placeholder='Select...' mt={4} onChange={(event)=> setGenre(event.target.value)}>
              <option value='option1'>Fiction</option>
              <option value='option2'>Non-fiction</option>
            </Select>

            <Heading size='sm'>Description</Heading>
            <FormControl mt={4}>
              <Input placeholder='A traveler goes on a journey to...' onChange={(event) => setDescription(event.target.value)}/>
            </FormControl>

            {/*<Heading size='sm'>Condition</Heading>
            <Select placeholder='Select...' mt={4}>
              <option value='option1'>Like New</option>
              <option value='option2'>Minimal Wear</option>
              <option value='option3'>Moderate Wear</option>
              <option value='option4'>In Tatters</option>
            </Select> */}

            {/*}
            <Heading size='sm'>Cover Style</Heading>
            <Select placeholder='Select...' mt={4}>
              <option value='option1'>Hard Cover</option>
              <option value='option2'>Paperback</option>
            </Select>
            */}
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' mr={3} onClick={submit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BookUpload