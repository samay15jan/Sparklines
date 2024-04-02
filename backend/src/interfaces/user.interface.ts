import type { Document } from 'mongoose'
import type { Request } from 'express'

export interface UserDoc extends Document {
  email: string
  password: string
  username: string
  profilePic: string
  newUser: boolean
  languages: string[]
  comparePassword(password: string): Promise<boolean>
  apiKey: string
  apiKeyCreated: Date
  apiKeyExpiry: string
}

export interface FileRequest extends Request {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

export interface UserData {
  username: string
  profilePic: string
  userId: string
}
