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
  Box
} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import { search } from '@chewhx/google-books'
import ImageUpload from './ImageUpload'
import axios from 'axios'

const BookUpload = () => {
  const { isOpen, onOpen, onClose } = useDisclosure() 

  const [name, setName] = useState<string>("");
  const [isbn, setIsbn] = useState<number>();

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!name) return;
      search(name)
      .then(res => {
        console.log(res);
      })
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [name])
  
  

  return (
    <>
      <Button mt={4} onClick={onOpen}>
        <Center>
          Upload Book
        </Center>
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <center>
              <span className='theme-header'>Book Upload</span>
            </center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Heading>
              <Center>
              <Box height="100%" display="flex" alignItems="center" justifyContent="center">
                <Center width="100%" height="100%">
                <ImageUpload/>
                 </Center>
              </Box>
              </Center>
            </Heading>

            <Heading size='sm'>Title</Heading>
            <FormControl>
              <Input ref={initialRef} value={name} onChange={(event) => setName(event.target.value)} placeholder='Book Title' />
            </FormControl>

            <Heading size='sm'>Author</Heading>
            <FormControl mt={4}>
              <Input placeholder='Book Author' />
            </FormControl>

            <Heading size='sm'>Condition</Heading>
            <Select placeholder='Select...' mt={4}>
              <option value='option1'>Like New</option>
              <option value='option2'>Minimal Wear</option>
              <option value='option3'>Moderate Wear</option>
              <option value='option4'>In Tatters</option>
            </Select>

            <Heading size='sm'>Cover Style</Heading>
            <Select placeholder='Select...' mt={4}>
              <option value='option1'>Hard Cover</option>
              <option value='option2'>Paperback</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BookUpload