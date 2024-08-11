import type { Document } from 'mongoose'
import type { Request } from 'express'

export interface FollowingDoc extends Document {
  id: string
  name: string
  image: string
}

export interface SongDoc extends Document {
  id: string
  image: string
  name: string
  artist: string
  artistId: string
  album: string
  albumId: string
  duration: string
}

export interface PlaylistDoc extends Document {
  id: string
  image: string
  name: string
  artist: string
  artistId: string
  year: string
  type: string
  date: Date
  songs: SongDoc[]
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
  following: FollowingDoc[]
  likedPlaylists: PlaylistDoc[]
  likedAlbum: PlaylistDoc[]
  playlists: PlaylistDoc[]
  likedMusic: SongDoc[]
  recentlyPlayed: SongDoc[]
  queue: SongDoc[]
}

export interface FileRequest extends Request {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: any
  size: number
}
