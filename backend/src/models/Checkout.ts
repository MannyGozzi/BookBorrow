import { Schema, model } from 'mongoose'
import { ICheckout } from './types'
import { v4 as uuidv4 } from 'uuid'

const checkoutSchema = new Schema<ICheckout>({
  _id: { type: String, default: uuidv4() },
  user: { type: String, ref: 'User', required: true },
  lender: { type: String, ref: 'User', required: true },
  book: { type: String, ref: 'Book', required: true },
  approved: { type: Boolean, default: false },
  checkout_date: { type: Date, required: true },
  due_date: { type: Date, default: null },
  return_date: { type: Date, default: null },
  returned: { type: Boolean, default: false }
})

const CheckoutModel = model<ICheckout>('Checkout', checkoutSchema)

export default CheckoutModel
