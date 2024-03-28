import jwt from 'jsonwebtoken'
import User from 'models/userSchema'
import type { NextFunction, Request, Response } from 'express'

interface DecodedToken {
  userId: string
}

export class Authorization {
  private secretKey: string

  constructor() {
    this.secretKey = process.env.SECRET_KEY
    this.authenticate = this.authenticate.bind(this)
  }

  public async authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    try {
      const decoded = jwt.verify(token, this.secretKey)
      const decodedToken = decoded as DecodedToken
      const user = await User.findById(decodedToken.userId)

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.status(200).json({
        userData: {
          userId: `${user._id}`,
          username: `${user.username}`,
          email: `${user.email}`,
          profilePic: `${user.profilePic}`,
        },
      })
      next()
    } catch {
      return res.status(401).json({ message: 'An error occured' })
    }
  }
}
