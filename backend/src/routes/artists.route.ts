import { Router } from 'express'
import { artistSongsAndAlbumsSchema, artistsSchema } from '../helpers/validation.helper'
import { ArtistsController } from '../controllers/artists.controller'
import { authenticateUser } from '../middlewares/verifyUser.middleware'
import type { Route } from '../interfaces/route.interface'

export class ArtistsRoute implements Route {
  public path = '/artists'
  public router = Router()
  public artistsController = new ArtistsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, artistsSchema, authenticateUser, this.artistsController.artistDetails)
    this.router.get(
      `${this.path}/:artistId/albums`,
      artistSongsAndAlbumsSchema,
      authenticateUser,
      this.artistsController.artistAblums
    )
    this.router.get(
      `${this.path}/:artistId/songs`,
      artistSongsAndAlbumsSchema,
      authenticateUser,
      this.artistsController.artistSongs
    )
  }
}
