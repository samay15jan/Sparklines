const cloudinary = require('cloudinary').v2
const fs = require('fs');
const User = require('../models/UserSchema')

const updateData = async (req, res, next) => {
  const { username, profilePic, userId } = req.body

  if (!username) {
    return res.status(401).json({ message: 'An Error Occured' })
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { username: username, profilePic: profilePic },
      { new: true }
    )
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(500).json({ message: 'An Error Occured' })
  }
}


const imageUploader = async (req, res, next) => {
  const profilePic = req.file
  if (!profilePic) {
    return res.status(404).json({ message: 'Image not found!' })
  }

  const config = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_API_SECRET
  }

  try {
    cloudinary.config(config)
    const result = await cloudinary.uploader.upload(profilePic.path, { public_id: profilePic.originalname })
    fs.unlinkSync(profilePic.path)
    if (!result) {
      return res.status(401).json({ message: 'An error occured!' })
    }
    req.profilePic = result.secure_url
    next()
  } catch (error) {
    return res.status(500).json({ message: 'Failed to upload' })
  }
}


const addLanguages = async (req, res, next) => {
  const { languages, userId } = req.body

  if (!languages || !userId) {
    return res.status(401).json({ message: 'An error occured' })
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { languages: languages },
      { new: true }
    )
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' })
    }
    req.languages = user.languages
    next()
  } catch (error) {
    return res.status(500).json({ message: 'Failed to upload' })
  }
}

module.exports = { updateData, imageUploader, addLanguages }