import { Router } from 'express'
import { Authorization } from 'middlewares/authorization.middleware'
import { ImageUploader } from 'utils/imageUploader'
import { UpdateUserProfile } from 'controllers/userData.controller'
import type { Route } from '../interfaces/route.interface'

export class UserRoute implements Route {
  public path = '/user'
  public router = Router()
  public authMiddleware = new Authorization()
  public imageUploader = new ImageUploader()
  public userData = new UpdateUserProfile()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/profile`, this.authMiddleware.authenticate)
    this.router.post(`${this.path}/imageUploader`, this.imageUploader.upload)
    this.router.post(`${this.path}/updateData`, this.userData.updateData)
  }
}
