import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import type { UserDoc } from '../interfaces/user.interface'

const userSchema = new Schema<UserDoc>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  profilePic: {
    type: String,
    default: 'https://res.cloudinary.com/sparklines/image/upload/v1710355835/default/bzcj4ipftbmo48v30din.png',
  },
  newUser: {
    type: Boolean,
    default: true,
  },
  languages: {
    type: [String],
    default: ['english'],
  },
  apiKey: {
    type: String,
  },
  apiKeyCreated: {
    type: Date,
  },
  apiKeyExpiry: {
    type: String,
  },
})

// Generate a random username before saving the document
userSchema.pre('save', async function (next) {
  if (!this.isModified('username')) {
    const randomNumber = Math.round(Math.random() * 1000000)
    this.username = `user_${randomNumber}`
  }
  next()
})

// Hashing Password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    return next(error)
  }
})

// Comparing Password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
