import jwt from 'jsonwebtoken'
import User from '../models/userSchema'
import { globalConstants } from '../constants'
import type { NextFunction, Request, Response } from 'express'

export class AuthController {
  // Register new user
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const user = new User({ email, password })
      await user.save()
      res.json({ status: globalConstants.status.success, message: 'User Registered', data: null })
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' })
      next(error)
    }
  }

  // Login existing user
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      const key = process.env.SECRET_KEY || ''
      if (!user) {
        return res.status(401).json({ status: globalConstants.status.failed, message: 'User not found', data: null })
      }

      const passwordMatch = await user.comparePassword(password)
      if (!passwordMatch) {
        res.status(401).json({ status: globalConstants.status.failed, message: 'Incorrect password', data: null })
        return
      }

      const jwtToken = jwt.sign({ userId: user._id }, key, {
        expiresIn: '1h',
      })
      res.json({ status: globalConstants.status.success, message: 'Generated Token (valid: 1h)', data: jwtToken })
    } catch (error) {
      next(error)
    }
  }
}
