import mongoose from 'mongoose'
import UserModel from '../models/User'
import BookModel from '../models/Book'
import CheckoutModel from '../models/Checkout'
import ReviewModel from '../models/Review'
import { genSalt, hash } from 'bcryptjs'

async function seedDatabase() {
  console.log('Starting the Seed proces...')

  await mongoose.connect(process.env.MONGODB_URI)

  await mongoose.connection.dropDatabase()

  // Seed users
  const salt = await genSalt(10)
  const hashedPassword = await hash('password123', salt)

  // Seed users
  const users = [
    {
      _id: '1',
      username: 'User1',
      email: 'user1@gmail.com',
      password: hashedPassword,
      first_name: 'First',
      last_name: 'User',
      zip_code: '12345'
    },
    {
      _id: '2',
      username: 'User2',
      email: 'user2@gmail.com',
      password: hashedPassword,
      first_name: 'Second',
      last_name: 'User',
      zip_code: '23456'
    },
    {
      _id: '3',
      username: 'User3',
      email: 'user3@gmail.com',
      password: hashedPassword,
      first_name: 'Third',
      last_name: 'User',
      zip_code: '34567'
    }
  ]

  const createdUsers = await UserModel.create(users)

  // Seed books
  const books = []
  for (let i = 0; i < 15; i++) {
    books.push({
      _id: (i + 1).toString(),
      title: `Book${i + 1}`,
      description: `Description HELLO!${i + 1}`,
      author: `Author${i + 1}`,
      isbn: `123456789${i}`,
      lender: users[i % 3]._id, // cycle lenders between the three users
      location: {
        type: 'Point',
        coordinates: [-120.659615, 35.282753] // Fixed coordinates
      }
    })
  }

  const createdBooks = await BookModel.create(books)

  // Seed checkouts
  const checkouts = [
    {
      _id: '1',
      user: users[0]._id,
      book: books[0]._id,
      checkout_date: new Date(),
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Due in 1 week
    },
    {
      _id: '2',
      user: users[1]._id,
      book: books[1]._id,
      checkout_date: new Date(),
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Due in 1 week
    },
    {
      _id: '3',
      user: users[2]._id,
      book: books[2]._id,
      checkout_date: new Date(),
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Due in 1 week
    },
    {
      _id: '4',
      user: users[0]._id,
      book: books[3]._id,
      checkout_date: new Date(),
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Due in 1 week
    }
  ]

  const createdCheckouts = await CheckoutModel.create(checkouts)

  // Seed reviews
  const reviews = [
    {
      _id: '1',
      reviewer: users[0]._id,
      reviewed_lender: users[1]._id,
      rating: 4,
      comment: 'Great experience!',
      date_created: new Date()
    },
    {
      _id: '2',
      reviewer: users[1]._id,
      reviewed_lender: users[0]._id,
      rating: 5,
      comment: 'Fantastic lender!',
      date_created: new Date()
    }
  ]

  await ReviewModel.create(reviews)

  console.log('Database seeding completed!')

  process.exit()
}

seedDatabase().catch(console.error)
