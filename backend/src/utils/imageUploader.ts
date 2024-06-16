import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import { globalConstants } from '../constants'
import { logger } from './logger'
import type { NextFunction, Request, Response } from 'express'
import type { FileRequest } from 'interfaces/user.interface'

export class ImageUploader {
  public upload = async (req: Request, res: Response, next: NextFunction) => {
    const profilePic = (req as FileRequest).file

    if (!profilePic) {
      res.status(404).json({ status: globalConstants.status.failed, message: 'Image not found!' })
      return
    }

    const config = {
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    }

    try {
      cloudinary.config(config)
      // Upload an image
      const result = await cloudinary.uploader.upload(profilePic.path, { 
        public_id: profilePic.originalname 
      })

      // Transform the image: auto-crop to square aspect_ratio
      const publicID = profilePic.originalname + ".jpg"
      const autoCropUrl = cloudinary.url(publicID, {
        crop: 'fill',
        width: 500,
        height: 500,
      })
      
      fs.unlink(profilePic.path, (err) => {
        if (err) {
          logger.error(`Error deleting image (${profilePic.path}): `, err)
          return
        }
        logger.debug('Temp: Cleared')
      })

      if (!result) {
        res.status(401).json({ status: globalConstants.status.failed, message: 'Error uploading image to Cloudinary' })
        return
      }

      res.json({ status: globalConstants.status.success, message: 'Successfully uploaded', data: autoCropUrl })
    } catch (error) {
      next(error)
    }
  }
}
