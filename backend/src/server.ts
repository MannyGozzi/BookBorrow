import express, { json, urlencoded } from 'express'
import cookieSession from 'cookie-session'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRoutes from './routes/userRoutes'
import reviewRoutes from './routes/reviewRoutes'
import checkoutRoutes from './routes/checkoutRoutes'
import bookRoutes from './routes/bookRoutes'

dotenv.config()

// Setting up port
const PORT = process.env.PORT || 3000

const app = express()
app.use(urlencoded({ extended: false })) // For body parser
app.use(json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// wire up all the routes
app.use('/books', bookRoutes)
app.use('/users', userRoutes)
app.use('/reviews', reviewRoutes)
app.use('/checkout', checkoutRoutes)

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log('BooBo backend listening on port 3000!'))
})
