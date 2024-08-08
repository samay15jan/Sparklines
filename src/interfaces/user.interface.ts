import type { Document } from 'mongoose'
import type { Request } from 'express'

interface FollowingItem {
  artistId: string
  imageUrl: string
}

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
  following: FollowingItem[]
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
