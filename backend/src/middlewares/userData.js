const cloudinary = require('cloudinary').v2
const fs = require('fs');
const User = require('../models/UserSchema')

const updateUsername = async (req, res, next) => {
  const username = req.body
  const userId = req.body.userId

  if(!username){
    res.status(401).json({ message: 'An Error Occured' })
    return
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { username: username },
      { new: true }
    )
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' })
    }
    next()
  } catch (error) {
    res.status(500).json({ message: 'An Error Occured' })
  }
}


const imageUploader = async (req, res, next) => {
  const profilePic = req.file
  const userId = req.body.userId

  if (!profilePic) {
    res.status(404).json({ message: 'Image not found!' })
    return
  }

  const config = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_API_SECRET
  }

  try {
    cloudinary.config(config)

    let i = 0 
    while (i < 2) {
      const result = await cloudinary.uploader.upload(profilePic.path, { public_id: profilePic.originalname })
      if (result) {
        fs.unlinkSync(profilePic.path)
        break
      } else (i++)
    }
    if(!result){
      res.status(500).json({ message: 'An error occured!' })
    }

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { profilePic: result.secure_url },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    req.profilePic = user.profilePic
    next()
  } catch (error) {
      res.status(401).json({ message: 'Failed to upload' })
  }
}

module.exports = { updateUsername, imageUploader }