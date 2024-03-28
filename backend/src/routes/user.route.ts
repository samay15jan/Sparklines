import { Router } from 'express'
import { Authorization } from 'middlewares/authorization.middleware'
import type { Route } from '../interfaces/route.interface'

export class UserRoute implements Route {
  public path = '/user'
  public router = Router()
  public authMiddleware = new Authorization()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/profile`, this.authMiddleware.authenticate)
  }
}
