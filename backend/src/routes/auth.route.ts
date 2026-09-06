import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import type { Route } from '../interfaces/route.interface'

export class AuthRoute implements Route {
  public path = '/auth'
  public router = Router()
  public authController = new AuthController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.authController.register)
    this.router.post(`${this.path}/login`, this.authController.login)
  }
}
