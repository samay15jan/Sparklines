import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import type { FollowingDoc, PlaylistDoc, SongDoc, UserDoc } from '../interfaces/user.interface'

const followingSchema = new Schema<FollowingDoc>(
  {
    id: { type: String },
    name: { type: String },
    image: { type: String, default: 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png' },
  },
  { _id: false }
)

const songSchema = new Schema<SongDoc>(
  {
    id: { type: String },
    image: { type: String, default: 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png' },
    name: { type: String },
    artist: { type: String },
    album: { type: String },
    artistId: { type: String },
    albumId: { type: String },
    duration: { type: String },
  },
  { _id: false }
)

const playlistSchema = new Schema<PlaylistDoc>({
  image: { type: String, default: 'https://www.jiosaavn.com/_i/3.0/artist-default-music.png' },
  name: { type: String },
  type: { type: String, default: 'Playlist' },
  date: { type: Date, default: Date.now() },
  songs: [songSchema],
})

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
    default:
      'https://res.cloudinary.com/sparklines/image/upload/c_fill,h_500,w_500/v1710355835/default/bzcj4ipftbmo48v30din.png',
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
    unique: true,
  },
  apiKeyCreated: {
    type: Date,
  },
  apiKeyExpiry: {
    type: String,
  },
  following: [followingSchema],
  likedPlaylists: [playlistSchema],
  likedAlbum: [playlistSchema],
  playlists: [playlistSchema],
  likedMusic: [songSchema],
  recentlyPlayed: [songSchema],
  queue: [songSchema],
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
