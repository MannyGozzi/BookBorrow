import express from 'express'
import asyncHandler from 'express-async-handler'
import CheckoutModel from '../models/Checkout'
import { v4 as uuidv4 } from 'uuid'
import { verifyJWT } from '../middlewares/auth'
import BookModel from '../models/Book'

const router = express.Router()
// checkouts by user
router.get(
  '/by/:userId',
  asyncHandler(async (req, res) => {
    const checkouts = await CheckoutModel.find({ user: req.params.userId })

    if (!checkouts) {
      res.status(404).json({ error: 'No checkouts found' })
    }
    res.status(201).json(checkouts)
  })
)

// checkout from the lender
router.get(
  '/from/:lenderId',
  asyncHandler(async (req, res) => {
    const checkouts = await CheckoutModel.find({lender: req.params.lenderId})

    if (!checkouts) {
      res.status(404).json({ error: 'No checkouts found' })
    }
    res.status(201).json(checkouts)
  })
)

router.post(
  '/:bookId',
  verifyJWT,
  asyncHandler(async (req, res) => {
    const { userId, lender } = req.body
    const checkout_date = new Date()

    const alreadyCheckedOut = await CheckoutModel.findOne({ user: userId._id, book: req.params.bookId })
    if (alreadyCheckedOut) {
      res.status(400).json({ error: 'Book is already checked out' })
    }
    const targetBook = await BookModel.findById(req.params.bookId)

    if (!targetBook) {
      res.status(404).json({ error: 'Book not found' })
    }

    if (!targetBook.available) {
      res.status(400).json({ error: 'Book is not available' })
    }

    const checkout = new CheckoutModel({
      _id: uuidv4(),
      book: req.params.bookId,
      user: req.body.userId,
      lender: req.body.lender,
      checkout_date,
      due_date: null,
      return_date: null
    })

    const [createdCheckout] = await Promise.all([checkout.save(), targetBook.save()])

    res.status(201).json(createdCheckout)
  })
)

router.post(
  '/confirm/:checkoutId',
  verifyJWT,
  asyncHandler(async (req, res) => {
    const {approved, due_date} = req.body

    const targetCheckout = await CheckoutModel.findById(req.params.checkoutId)
    if (!targetCheckout) {
      res.status(404).json({ error: 'Checkout not found' })
    }
    if (!approved) {
      CheckoutModel.deleteOne({ _id: req.params.checkoutId }).exec()
      res.status(201).json({message: 'Checkout declined!'})
      return
    }
    if (targetCheckout.approved) {
      res.status(400).json({ error: 'Checkout is already confirmed' })
      return
    }
    const targetBook = await BookModel.findById(targetCheckout.book)

    if (!targetBook || !targetBook?.available) {
      res.status(400).json({ error: 'Checkout book is unavailable' })
      return
    }

    targetBook.available = false
    targetCheckout.approved = true
    targetCheckout.due_date = due_date
    await Promise.all([targetCheckout.save(), targetBook.save()])
    res.status(201).json(targetCheckout)
  })
)

router.post(
  '/return/:checkoutId',
  verifyJWT,
  asyncHandler(async (req, res) => {
    const targetCheckout = await CheckoutModel.findById(req.params.checkoutId)

    if (!targetCheckout) {
      res.status(404).json({ error: 'Checkout not found' })
      return
    }

    if (targetCheckout.returned) {
      res.status(400).json({ error: 'Book is already returned' })
      return
    }

    targetCheckout.returned = true
    targetCheckout.return_date = new Date()


    const targetBook = await BookModel.findById(targetCheckout.book)
    targetBook.available = true

    await Promise.all([targetCheckout.save(), targetBook.save()])

    res.status(201).json({ message: 'Book returned' })
  })
)

export default router
