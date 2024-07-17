import { Router } from 'express'
import { ApiKeyController } from '../controllers/apiKey,controller'
import type { Route } from '../interfaces/route.interface'

export class ApiRoute implements Route {
  public path = '/token'
  public router = Router()
  public apiKeyController = new ApiKeyController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/generate`, this.apiKeyController.generateAPI)
  }
}
