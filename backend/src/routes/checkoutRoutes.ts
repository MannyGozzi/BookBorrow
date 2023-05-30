import express from 'express'
import asyncHandler from 'express-async-handler'
import CheckoutModel from '../models/Checkout'
import { v4 as uuidv4 } from 'uuid'
import { verifyJWT } from '../middlewares/auth'
import BookModel from '../models/Book'

const router = express.Router()
router.get(
  '/from/:userId',
  asyncHandler(async (req, res) => {
    const checkouts = await CheckoutModel.find({user: req.params.userId})

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
    const { checkout_date, due_date, return_date } = req.body

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
      checkout_date,
      due_date,
      return_date
    })

    targetBook.available = false

    const [createdCheckout] = await Promise.all([checkout.save(), targetBook.save()])

    res.status(201).json(createdCheckout)
  })
)

router.post(
  '/:checkoutId',
  verifyJWT,
  asyncHandler(async (req, res) => {
    const targetCheckout = await CheckoutModel.findById(req.params.checkoutId)

    if (!targetCheckout) {
      res.status(404).json({ error: 'Checkout not found' })
    }

    if (targetCheckout.returned) {
      res.status(400).json({ error: 'Book is already returned' })
    }

    targetCheckout.returned = true

    const targetBook = await BookModel.findById(targetCheckout.book)
    targetBook.available = true

    await Promise.all([targetCheckout.save(), targetBook.save()])

    res.status(201).json({ message: 'Book returned' })
  })
)

export default router
