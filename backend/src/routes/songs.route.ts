import { Router } from 'express'
import { SongsController } from '../controllers/songs.controller'
import { songsSchema } from '../helpers/validation.helper'
import { authenticateUser } from '../middlewares/verifyUser.middleware'
import type { Route } from '../interfaces/route.interface'

export class SongsRoute implements Route {
  public path = '/songs'
  public router = Router()
  public songsController = new SongsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, songsSchema, authenticateUser, this.songsController.songDetails)
    this.router.get(
      `${this.path}/recommendations`,
      songsSchema,
      authenticateUser,
      this.songsController.recommendedSongs
    )
  }
}
