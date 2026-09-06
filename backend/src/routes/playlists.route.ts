import { Router } from 'express'
import { idSchema } from '../helpers/validation.helper'
import { PlaylistsController } from '../controllers/playlists.controller'
import { authenticateUser } from '../middlewares/verifyUser.middleware'
import type { Route } from '../interfaces/route.interface'

export class PlaylistsRoute implements Route {
  public path = '/playlists'
  public router = Router()
  public playlistsController = new PlaylistsController()
  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, idSchema, authenticateUser, this.playlistsController.playlistDetails)
  }
}
