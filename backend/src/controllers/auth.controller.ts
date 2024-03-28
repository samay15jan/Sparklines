import jwt from 'jsonwebtoken'
import User from '../models/userSchema'
import type { NextFunction, Request, Response } from 'express'

export class AuthController {
  // Register new user
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const user = new User({ email, password })
      await user.save()
      res.status(201).json({ message: 'User Registered' })
    } catch (error: any) {
      res.status(500).json({ message: 'Internal Server Error' })
      next(error)
    }
  }

  // Login existing user
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({ message: 'User not found' })
      }

      const passwordMatch = await user.comparePassword(password)
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Incorrect password' })
      }

      const jwtToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1 hour',
      })

      res.status(200).json({ token: jwtToken })
    } catch (error: any) {
      next(error)
    }
  }
}
