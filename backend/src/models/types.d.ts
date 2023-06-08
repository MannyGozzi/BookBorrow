import { Document } from 'mongoose'

export interface IGeoLocation {
  type: 'Point'
  coordinates: [number, number] // longitude and latitude
}
export interface IUser extends Document {
  id: number
  username: string
  zip_code: string
  email: string
  password: string
  first_name: string
  lender: String
  borrower?: String | null
  last_name: string
  date_joined: Date
  is_staff: boolean
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
  lender: string
  borrower?: string
  available: boolean
  date_added: Date
  location: IGeoLocation
}

export interface IReview extends Document {
  id: number
  reviewer: String
  reviewed_lender: String
  rating: number
  comment?: string
  date_created: Date
}

interface ICheckout extends Document {
  id: number
  user: String
  lender: String
  book: String
  checkout_date: Date
  approved: boolean
  due_date?: Date | null
  return_date?: Date | null
  returned: boolean
}
