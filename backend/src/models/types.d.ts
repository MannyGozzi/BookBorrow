import { Document, Types } from 'mongoose'

export interface IUser extends Document {
  id: number
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  date_joined: Date
  is_staff: boolean
  zip_code: string
  updatePassword(newPassword: string): Promise<boolean>
  isValidPassword(password: string): Promise<boolean>
  toJSON(): Exclude<IUser, 'password'>
}

export interface IBook extends Document {
  id: number
  title: string
  author: string
  isbn?: string
  publication_date?: Date
  genre?: string
  cover_image?: string
  description?: string
  lender: Types.ObjectId
  borrower?: Types.ObjectId | null
  available: boolean
  date_added: Date
  zip_code: string
}

export interface IReview extends Document {
  id: number
  reviewer: Types.ObjectId
  reviewed: Types.ObjectId
  rating: number
  comment?: string
  date_created: Date
}

interface ICheckout extends Document {
  id: number
  user: Types.ObjectId
  book: Types.ObjectId
  checkout_date: Date
  due_date: Date
  return_date?: Date | null
  returned: boolean
}
