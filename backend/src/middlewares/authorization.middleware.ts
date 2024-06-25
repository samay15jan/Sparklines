import jwt from 'jsonwebtoken'
import User from 'models/userSchema'
import { globalConstants } from '../constants'
import type { NextFunction, Request, Response } from 'express'

interface DecodedToken {
  userId: string
}

export class Authorization {
  constructor() {
    this.authenticate = this.authenticate.bind(this)
  }

  public async authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]
    const key: string = process.env.SECRET_KEY || ''

    if (!token) {
      return res.status(401).json({ status: globalConstants.status.failed, message: 'Token is not valid', data: null })
    }

    try {
      const decoded = jwt.verify(token, key)
      const decodedToken = decoded as DecodedToken
      const user = await User.findById(decodedToken.userId)

      if (!user) {
        return res.status(404).json({ status: globalConstants.status.failed, message: 'User not found', data: null })
      }

      const userData = {
        userId: `${user._id}`,
        username: `${user.username}`,
        email: `${user.email}`,
        profilePic: `${user.profilePic}`,
      }

      res.json({ status: globalConstants.status.success, message: 'Successfully authorized ', data: userData })
    } catch (error) {
      next(error)
    }
  }
}
