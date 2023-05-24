export type TextType = {
    text: string
}

export type UserBookType = {
    title: string,
    author: string, 
    isbn: string,
    description: string,
    image: string,
    rating: number, 
}

export type BookViewType = {
    title: string,
    author: string, 
    isbn: string,
    description: string,
    image: string,
    rating: number, 
    distance: number
}


export interface IUser {
    _id: number
    username: string
    email: string
    first_name: string
    last_name: string
    date_joined: Date
    is_staff: boolean
    zip_code: string
  }
  
  export interface IBook {
    _id: number
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
  
  export interface IReview {
    _id: number
    reviewer: Types.ObjectId
    reviewed: Types.ObjectId
    rating: number
    comment?: string
    date_created: Date
  }
  
  interface ICheckout {
    _id: number
    user: Types.ObjectId
    book: Types.ObjectId
    checkout_date: Date
    due_date: Date
    return_date?: Date | null
    returned: boolean
  }
  
