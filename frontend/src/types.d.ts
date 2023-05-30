export type TextType = {
  text: string
}

export type UserBookType = {
  title: string
  author: string
  isbn: string
  description: string
  image: string
  rating: number
}

export type BookViewType = {
  _id: string
  lender: string
  title: string
  author: string
  isbn: string
  description: string
  image: string
  rating: number
  distance: number
}

export interface IUser {
  _id: string
  username: string
  email: string
  first_name: string
  last_name: string
  date_joined: Date
  is_staff: boolean
  zip_code: string
}

export interface IBook {
  _id: string
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

export interface IBookView extends IBook {
  distance: number
  bookIndex?: number
}

export interface IReview {
  _id: string
  reviewer: Types.ObjectId
  reviewed: Types.ObjectId
  rating: number
  comment?: string
  date_created: Date
}

interface ICheckout {
  _id: string
  user: Types.ObjectId
  book: Types.ObjectId
  checkout_date: Date
  due_date: Date
  return_date?: Date | null
  returned: boolean
}
