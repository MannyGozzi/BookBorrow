import { Schema, model } from 'mongoose'
import { IReview } from './types'
import { v4 as uuidv4 } from 'uuid'

const reviewSchema = new Schema<IReview>({
  _id: { type: String, default: uuidv4() },
  reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reviewed_lender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  date_created: { type: Date, required: true }
})

const ReviewModel = model<IReview>('Review', reviewSchema)

export default ReviewModel
