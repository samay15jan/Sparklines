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
  likedMusic: string[]
  likedPlaylists: string[]
  likedAlbum: string[]
  currentPlaying: string[]
  queue: string[]
  recentlyPlayed: string[]
  playlists: string[]
}

export interface FileRequest extends Request {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: any
  size: number
}
