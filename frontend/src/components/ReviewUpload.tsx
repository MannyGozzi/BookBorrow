import {
    Button,
    Center,
    FormControl,
    Heading,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    useDisclosure,
    Box,
    FormLabel,
    Textarea,
    useToast,
    HStack
  } from '@chakra-ui/react'
  import React, { useState } from 'react'
  import axios from 'axios'
  import { useSelector } from 'react-redux'
  import { useDispatch } from 'react-redux'
  import { addReview } from '../actions/reviewActions'
  import StarRatingReview from './RatingStarsReview'
  import { IUser } from '../types'

  
  const ReviewUpload = ({reviewLenderID}: {reviewLenderID: string}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const [reviewer, SetReviewer] = useState<string>('')
    // const [reviewedLender, setReviewedLender] = useState<string>('')
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('')
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const user = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    const toast = useToast()

    const resetRating = () => {
          setRating(0);
      };
      
    const resetComment = () => {
        setComment("");
    };
    
    const submit = async () => {
      const today = new Date();
      const date_created = today.toISOString().slice(0,10);

      if (rating === 0) {
        console.error('Please provide a rating');
        toast({
          title: 'Rating not provided',
          description: "Please provide a rating.",
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
        return;
      }

      if (comment.length > 300) {
        console.error('Exceeded maximum character count of 300 characters');
        toast({
          title: 'Comment over 3000 characters',
          description: "Please provide a comment less than or equal to 3000 characters.",
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
        return;
      }

      axios.post(`http://localhost:3000/reviews/${user._id}`,
        {reviewed_lender: reviewLenderID, rating, comment, date_created}, 
        { withCredentials: true })
        .then(response => {
          dispatch(addReview(response.data.review))
          toast({
            title: 'Review Posted!',
            description: "Thank you for your review!",
            status: 'success',
            duration: 7000,
            isClosable: true,
          })
        })
        .catch(error => console.error(error))
      onClose()
    }
  
    return (
      <>
        <Button mt={4} onClick={onOpen} rounded={'xl'} size={'md'}>
          <Center>
            Upload Review
          </Center>
        </Button>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={() => {
          resetRating();
          resetComment();
          onClose();
        }}
        initialFocusRef={initialRef}>
          <ModalOverlay />
          <ModalContent w={'100%'}>
            <ModalHeader>
              <Center>
                <span className='theme-header'>Leave a Review!</span>
              </Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} w={'100%'}>
              <Heading>
                <Center>
                <Box height="100%" display="flex" alignItems="center" justifyContent="center">
                  <VStack spacing={2}>
                    <Center>
                    <VStack spacing={2}>
                      <Text fontSize="lg">Rate the lender <sup style={{ fontSize: '0.7em', color: 'red'}}>*</sup></Text>
                      <Text fontSize="xs">(from 1-5 stars)</Text>
                      </VStack>
                    </Center>
                    <Center width="100%" height="100%">
                      <StarRatingReview rating={rating} onChange={setRating}/>
                    </Center>
                  </VStack>
                </Box>
                </Center>
              </Heading>
              <VStack align="start">
              <FormControl mt={4}>
                <FormLabel htmlFor="comment">Add your comment (optional)</FormLabel>
                <Textarea
                  id="comment"
                  placeholder="Add your comment here..."
                  onChange={(event) => setComment(event.target.value)}
                  value={comment}
                  h={40}
                  resize="vertical"
                />
              </FormControl>
              <Text fontSize="xs">(Maximum 3000 characters)</Text>
              </VStack>
            </ModalBody>
  
            <ModalFooter display="flex" justifyContent="space-between">
              <HStack spacing={1} alignItems="center">
                <Text fontSize="md" color="red">*</Text>
                <Text fontSize=".9em">Required</Text>
              </HStack>
   
              <HStack spacing={3}>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={submit}>
                  Submit
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  export default ReviewUpload