import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/User'
import { issueJWT } from '../helpers/JWT'
import User from '../models/User'
import { hash } from 'bcryptjs'
import { verifyJWT } from '../middlewares/auth'
import BookModel from '../models/Book'
import ReviewModel from '../models/Review'

const router = express.Router()

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    if (user) {
      const [books, reviews] = await Promise.all([
        BookModel.find({ lender: user._id }),
        ReviewModel.find({ reviewed: user._id })
      ])

      res.json({ user: user.toJSON(), books, reviews })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
)

router.patch('/', verifyJWT, async (req, res) => {
  const { email, zip_code, username, firstName, lastName } = req.body

  const user = await UserModel.findById(req.userId)

  if (!user) {
    res.status(404).json({ msg: 'User not found' })
  }

  user.email = email || user.email
  user.zip_code = zip_code || user.zip_code
  user.username = username || user.username
  user.first_name = firstName || user.first_name
  user.last_name = lastName || user.last_name

  const updatedUser = await user.save()

  res.json({
    _id: updatedUser._id,
    email: updatedUser.email,
    zip_code: updatedUser.zip_code,
    username: updatedUser.username,
    firstName: updatedUser.first_name,
    lastName: updatedUser.last_name,
    token: issueJWT(updatedUser)
  })
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(401).send({ user, msg: 'No user found.' })
  }

  if (!(await user.isValidPassword(req.body.password))) {
    return res.status(401).send({ user, msg: 'Invalid password.' })
  }

  const jwtToken = issueJWT(user)
  return res
    .cookie('jwt', jwtToken.token, { httpOnly: true, secure: false, sameSite: 'lax' })
    .json({ user, msg: 'Logged in Successfully' })
})

router.post('/logout', verifyJWT, (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(400).send({ msg: 'Cannot logout if you are not logged in' })
  }

  return res.clearCookie('jwt').json({ msg: 'Logged out Successfully' })
})

router.post('/register', async (req, res) => {
  const { email, password, zip_code, username, firstName, lastName } = req.body

  const [existingUsername, existingEmail] = await Promise.all([
    UserModel.findOne({ username }),
    UserModel.findOne({ email })
  ])

  if (existingUsername) {
    return res.status(400).json({ msg: 'Username already taken' })
  }

  if (existingEmail) {
    return res.status(400).json({ msg: 'Email already taken' })
  }

  const encryptedPassword = await hash(password, 10)

  const user = new UserModel({
    email,
    password: encryptedPassword,
    zip_code,
    username,
    first_name: firstName,
    last_name: lastName
  })

  try {
    await user.save()

    const jwtToken = issueJWT(user)

    return res
      .status(201)
      .cookie('jwt', jwtToken.token, { httpOnly: true, secure: false })
      .json({ user: user.toJSON(), msg: 'User created successfully' })
  } catch (e) {
    return res.status(400).json({ msg: 'Error creating user' })
  }
})

export default router
