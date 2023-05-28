import express from 'express'
import asyncHandler from 'express-async-handler'
import BookModel from '../models/Book'
import { v4 as uuidv4 } from 'uuid'
import { verifyJWT } from '../middlewares/auth'
import UserModel from '../models/User'
import fileUpload from 'express-fileupload'

const router = express.Router()

router.post(
  '/',
  [verifyJWT, fileUpload()],
  asyncHandler(async (req, res) => {
    const { title, author, isbn, publication_date, genre, cover_image, description } = req.body
    console.log(req.body)
    const user = await UserModel.findById(req.userId)

    if (!user) {
      res.status(404).json({ error: 'User not found' })
    }

    const book = new BookModel({
      _id: uuidv4(),
      title,
      author,
      isbn,
      publication_date,
      genre,
      cover_image,
      description,
      available: true,
      lender: req.userId,
      zip_code: user.zip_code
    })

    const createdBook = await book.save()
    res.status(201).json(createdBook)
  })
)

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const searchTerm = req.query.searchTerm

    const query = {
    }

    // if (searchTerm) {
    //   // Add a search condition to the query using a regular expression
    //   query.title = { $regex: searchTerm, $options: 'i' }
    // }

    const count = await BookModel.countDocuments(query)
    const books = await BookModel.find(query)
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    res.json({
      pages: Math.ceil(count / pageSize),
      currentPage: page,
      books
    })
  })
)

export default router
