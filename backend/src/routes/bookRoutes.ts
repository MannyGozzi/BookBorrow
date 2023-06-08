import express from 'express'
import asyncHandler from 'express-async-handler'
import BookModel from '../models/Book'
import { v4 as uuidv4 } from 'uuid'
import { verifyJWT } from '../middlewares/auth'
import UserModel from '../models/User'
import fileUpload from 'express-fileupload'
import CheckoutModel from '../models/Checkout'
import { lookup } from 'geoip-lite'
import axios from 'axios'
import { issueJWT } from 'helpers/JWT'

const router = express.Router()

router.post(
  '/',
  [verifyJWT, fileUpload()],
  asyncHandler(async (req, res) => {
    const { title, author, isbn, publication_date, genre, cover_image, description } = req.body
    const user = await UserModel.findById(req.userId)

    if (!user) {
      res.status(404).json({ error: 'User not found' })
    }

    else if (title == '') {
      res.status(400).json({ msg: 'Title required' })
    }

    else if (author == '') {
      res.status(400).json({ msg: 'Author required' })
    }

    else if (isbn.length != 10 && isbn.length != 13) {
      res.status(400).json({ msg: 'ISBN must be 10 or 13 digits long' })
    }

    else if (publication_date == null) {
      res.status(400).json({ msg: 'Publication date required' })
    }
    
    else if (genre == '') {
      res.status(400).json({ msg: 'Genre required' })
    }
    
    else if (description == '') {
      res.status(400).json({ msg: 'Description required' })
    }

    // NOTE GEO IP DOES NOT WORK WITH ZIP CODE AS IT WAS
    const clientIp = req.ip === '127.0.0.1' || req.ip === '::1' ? '129.65.145.15' : req.ip
    const response = await axios.get(`https://ipapi.co/${clientIp}/json/`)
    const { latitude: lat, longitude: lon } = response.data
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
      location: {
        type: 'Point',
        coordinates: [lon, lat]
      }
    })

    const createdBook = await book.save()
    res.status(201).json(createdBook)
  }))

router.get(
  '/view/:id',
  asyncHandler(async (req, res) => {
    const bookId = req.params.id
    const book = await BookModel.findById(bookId)

    if (!book) {
      res.status(404).json({ error: 'Book not found' })
    }
    res.status(201).json(book)
  })
)

router.post(
  '/delete',
  verifyJWT,
  asyncHandler(async (req, res) => {
    const { _id } = req.body
    const targetBook = await BookModel.findById(_id)

    if (!targetBook) {
      res.status(404).json({ error: 'Book not found' })
    }

    await CheckoutModel.deleteMany({book: _id})

    const bookDeleted = await targetBook.deleteOne()
    
    res.status(201).json(bookDeleted)
  })
)

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const searchTerm = req.query.searchTerm

    // Get client's IP and find its location
    const clientIp = req.ip === '127.0.0.1' || req.ip === '::1' ? '129.65.145.15' : req.ip
    const response = await axios.get(`https://ipapi.co/${clientIp}/json/`)
    const { latitude: lat, longitude: lon } = response.data

    // Create a pipeline for the aggregate method
    const pipeline: any[] = [
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [lon, lat]
          },
          distanceField: 'distance',
          spherical: true
        }
      },
      {
        $addFields: {
          distance: {
            $divide: ['$distance', 1609.34] // (1 mile = 1609.34 meters)
          }
        }
      },
      {
        $match: {
          title: {
            $regex: new RegExp((searchTerm as string) || '', 'i')
          }
        }
      },
      {
        $facet: {
          books: [{ $skip: pageSize * (page - 1) }, { $limit: pageSize }],
          count: [{ $count: 'count' }]
        }
      },
      {
        $unwind: '$count'
      },
      {
        $addFields: {
          pages: { $ceil: { $divide: ['$count.count', pageSize] } },
          currentPage: page
        }
      },
      {
        $project: {
          books: 1,
          pages: 1,
          currentPage: 1
        }
      }
    ]

    const result = await BookModel.aggregate(pipeline)

    const books = result[0]?.books

    res.json({
      pages: result[0]?.pages,
      currentPage: result[0]?.currentPage,
      books
    })
  })
)

export default router
