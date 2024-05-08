import { Router } from 'express'
import { Authorization } from 'middlewares/authorization.middleware'
import { ImageUploader } from 'utils/imageUploader'
import { UpdateUserProfile } from 'controllers/userData.controller'
import multer from 'multer'
import type { Route } from '../interfaces/route.interface'

export class UserRoute implements Route {
  public path = '/user'
  public router = Router()
  public authMiddleware = new Authorization()
  public imageUploader = new ImageUploader()
  public userData = new UpdateUserProfile()
  public upload = multer()

  constructor() {
    this.upload = multer({ dest: 'public/avatar' })
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/profile`, this.authMiddleware.authenticate)
    this.router.post(`${this.path}/imageUploader`, this.upload.single('profilePic'), this.imageUploader.upload)
    this.router.post(`${this.path}/updateData`, this.userData.basicData)
    this.router.post(`${this.path}/addLanguages`, this.userData.updateLanguages)
    this.router.post(`${this.path}/likedMusic`, this.userData.likedMusic)
  }
}
