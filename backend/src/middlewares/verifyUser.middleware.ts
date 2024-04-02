import jwt from 'jsonwebtoken'
import User from 'models/userSchema'
import { globalConstants } from '../constants'
import type { NextFunction, Request, Response } from 'express'

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.originalUrl === '/token/generate' ||
      req.originalUrl === '/auth/register' ||
      req.originalUrl === '/auth/login' ||
      req.originalUrl === '/user/profile') {
      return next()
    }

    const apiKey: string = req.headers.authorization?.split(' ')[1] as string
    const userId: string = req.headers.userid as string
    const secretKey: string = process.env.SECRET_KEY || ''
    let token: string | undefined

    if (apiKey) {
      try {
        const decodedToken= jwt.verify(apiKey, secretKey) as { userId: string }
        token = decodedToken.userId
      } catch (error) {
        return res.status(401).json({ status: globalConstants.status.failed, message: 'Unauthorized: Invalid or expired API key' })
      }
    } else if (userId) {
      token = userId
    } else {
      return res.status(401).json({ status: globalConstants.status.failed, message: 'Unauthorized: Missing API key or user ID' })
    }

    const user = await User.findById(token)

    if (!user) {
      return res.status(404).json({ status: globalConstants.status.failed, message: 'User not found', data: null })
    }

    next()
  } catch (error) {
    next(error)
  }
}