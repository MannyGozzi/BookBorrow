import express from 'express'
import asyncHandler from 'express-async-handler'
import ReviewModel from '../models/Review'
import { v4 as uuidv4 } from 'uuid'
import { verifyJWT } from '../middlewares/auth'

const router = express.Router()

router.post(
  '/:userId',
  verifyJWT,
  asyncHandler(async (req, res) => {
    const { reviewed_lender, rating, comment, date_created } = req.body
    const review = new ReviewModel({
      _id: uuidv4(),
      reviewer: req.params.userId,
      reviewed_lender,
      rating,
      comment,
      date_created
    })

    const createdReview = await review.save()
    res.status(201).json(createdReview)
  })
)

router.get(
  '/:userId',
  asyncHandler(async (req, res) => {
    const reviews = await ReviewModel.find({ reviewed_lender: req.params.userId })
    res.json(reviews)
  })
)

export default router
