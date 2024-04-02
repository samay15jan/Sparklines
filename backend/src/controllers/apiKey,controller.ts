import jwt from "jsonwebtoken"
import User from '../models/userSchema'
import { globalConstants } from '../constants'
import type { NextFunction, Request, Response } from 'express'

export class ApiKeyController {
  public generateAPI = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, expiry } = req.body
    const key = process.env.SECRET_KEY || ''

    if (!userId) {
      return res.status(401).json({ status: globalConstants.status.failed, message: 'User not found', data: null })
    }

    const expiries = ['24h', '7d', '30d', 'never']
    if(!expiries.includes(expiry)){
      return res.status(401).json({ status: globalConstants.status.failed, message: 'Invalid expiry', data: null })
    }

    try {
      const checkExpiry = expiry === 'never' ? {} : { expiresIn: expiry }
      const apiKey = jwt.sign({ userId: userId }, key, checkExpiry)
      const response = { apiKey: apiKey, expiry: expiry }
      const apiKeyCreated = new Date()

      const updateDatabase = await User.findOneAndUpdate({ _id: userId }, { apiKey: apiKey, apiKeyCreated: apiKeyCreated, apiKeyExpiry: expiry })

      if (updateDatabase) {
        return res.status(200).json({ status: globalConstants.status.success, message: `Key Generated`, data: response })
      }

    } catch (error) {
      next(error)
    }
  }
}