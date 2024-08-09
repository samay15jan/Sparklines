import type { Document } from 'mongoose'
import type { Request } from 'express'

export interface ItemDoc extends Document {
  id: string
  image: string
}

export interface LikedDoc extends Document {
  id: string
  image: string
  name: string
  artist: string
  artistId: string
  album: string
  albumId: string
  duration: string
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
  following: ItemDoc[]
  playlists: ItemDoc[]
  likedPlaylists: ItemDoc[]
  likedAlbum: ItemDoc[]
  likedMusic: LikedDoc[]
  recentlyPlayed: ItemDoc[]
  currentPlaying: ItemDoc[]
  queue: ItemDoc[]
}

export interface FileRequest extends Request {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: any
  size: number
}
