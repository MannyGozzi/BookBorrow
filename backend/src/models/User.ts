import { Schema, model } from 'mongoose'
import { IUser } from './types'
import { genSalt, hash, compare } from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

const userSchema = new Schema<IUser>({
  _id: { type: String, default: uuidv4() },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_joined: { type: Date, required: true },
  is_staff: { type: Boolean, required: true },
  zip_code: { type: String, required: true }
})

userSchema.methods.updatePassword = async function (newPassword: string): Promise<boolean> {
  const salt = await genSalt(10)
  const encryptedPassword = await hash(newPassword, salt)

  this.password = encryptedPassword

  return true
}

userSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
  const user = this
  const result = await compare(password, user.password)

  return result
}

userSchema.methods.toJSON = function (): IUser {
  const user = this.toObject()

  delete user.password

  return user
}

const UserModel = model<IUser>('User', userSchema)

export default UserModel
