import User from 'models/userSchema'
import { globalConstants } from '../constants'
import type { NextFunction, Request, Response } from 'express'
import type { UserData } from 'interfaces/user.interface'

export class UpdateUserProfile {
  public updateData = async (req: Request, res: Response, next: NextFunction) => {
    const { username, profilePic, userId }: UserData = req.body

    if (!username && !profilePic && userId) {
      res.status(401).json({ statu2s: globalConstants.status.failed, message: 'An error occured' })
      return
    }

    try {
      const user = await User.findOneAndUpdate({ _id: userId }, { username, profilePic }, { new: true })

      if (!user) {
        res.status(404).json({ status: globalConstants.status.failed, message: 'User does not exist' })
        return
      }

      res.status(200).json({
        status: globalConstants.status.success,
        message: 'Successfully Changed',
        data: {
          username: `${user.username}`,
          profilePic: `${user.profilePic}`,
        },
      })
    } catch (error) {
      next(error)
    }
  }
}
