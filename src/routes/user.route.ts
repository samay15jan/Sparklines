import { Router } from 'express'
import multer from 'multer'
import { Authorization } from '../middlewares/authorization.middleware'
import { ImageUploader } from '../utils/imageUploader'
import { UpdateUserProfile } from '../controllers/userData.controller'
import { authenticateUser } from '../middlewares/verifyUser.middleware'
import type { Route } from '../interfaces/route.interface'

export class UserRoute implements Route {
  public path = '/user'
  public router = Router()
  public authMiddleware = new Authorization()
  public imageUploader = new ImageUploader()
  public userData = new UpdateUserProfile()
  public storage = multer.memoryStorage()
  public upload = multer({ storage: this.storage })

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/profile`, this.authMiddleware.authenticate)
    this.router.post(
      `${this.path}/imageUploader`,
      authenticateUser,
      this.upload.single('profilePic'),
      this.imageUploader.upload
    )
    this.router.post(`${this.path}/updateData`, authenticateUser, this.userData.basicData)
    this.router.post(`${this.path}/addLanguages`, authenticateUser, this.userData.updateLanguages)
    this.router.post(`${this.path}/updateFollowing`, authenticateUser, this.userData.updateFollowing)
  }
}
