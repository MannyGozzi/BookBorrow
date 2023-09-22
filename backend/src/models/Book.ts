import { Schema, model } from 'mongoose'
import { IBook } from './types'
import { v4 as uuidv4 } from 'uuid'

const bookSchema = new Schema<IBook>({
  _id: { type: String, default: uuidv4() },
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: false },
  publication_date: { type: Date },
  genre: { type: String },
  cover_image: {
    type: String,
    default:
      'https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  description: { type: String },
  lender: { type: String, ref: 'User', required: true },
  borrower: { type: String, ref: 'User', default: null },
  available: { type: Boolean, default: true },
  date_added: { type: Date, required: true, default: Date.now },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
})

bookSchema.index({ location: '2dsphere' })

const BookModel = model<IBook>('Book', bookSchema)

BookModel.init()
  .then(() => console.log('Book indexes have been created.'))
  .catch(console.error)

export default BookModel
