const cloudinary = require('cloudinary').v2
const fs = require('fs');

const imageUploader = async (req, res, next) => {
  const avatar = req.file
  
  if(!avatar){
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
    const result = await cloudinary.uploader.upload(avatar.path, { public_id: avatar.originalname })
    fs.unlinkSync(avatar.path)
    req.filename = result
    next()
  } catch (error) {
    res.status(401).json({ message: 'Failed to upload' })
  }
}

module.exports = { imageUploader }