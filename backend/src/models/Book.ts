import { Schema, model } from 'mongoose'
import { IBook } from './types'
import { v4 as uuidv4 } from 'uuid'

const bookSchema = new Schema<IBook>({
  _id: { type: String, default: uuidv4() },
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true },
  publication_date: { type: Date },
  genre: { type: String },
  cover_image: { type: String },
  description: { type: String },
  lender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  borrower: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  available: { type: Boolean, default: true },
  date_added: { type: Date, required: true }
})

const BookModel = model<IBook>('Book', bookSchema)

export default BookModel
