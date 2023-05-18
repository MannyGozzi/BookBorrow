import express from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import login from './routes/login'

dotenv.config()

// Setting up port
const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // For body parser
app.use(bodyParser.json())
app.use(
  cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
)

// wire up all the routes
app.use(login())

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (_req, res) => {
  res.send('hello world')
})

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log('BooBo backend listening on port 3000!'))
})