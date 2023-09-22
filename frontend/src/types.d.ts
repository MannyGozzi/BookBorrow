import { SetStateAction } from 'react'

export type TextType = {
  text: string
}

export type SearchBarProps = {
  text: string
  value: string
  onChange: Dispatch<SetStateAction<string>>
}

export interface IGeoLocation {
  type: 'Point'
  coordinates: [number, number] // longitude and latitude
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
  distance: number
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
  lender: Types.ObjectId
  book: Types.ObjectId
  approved: boolean
  checkout_date: Date
  due_date?: Date | null
  return_date?: Date | null
  returned: boolean
}
