import { Router } from 'express'
import { searchSchema } from '../helpers/validation.helper'
import { SearchController } from '../controllers/search.controller'
import { authenticateUser } from '../middlewares/verifyUser.middleware'
import type { Route } from '../interfaces/route.interface'

export class SearchRoute implements Route {
  public path = '/search'
  public router = Router()
  public searchController = new SearchController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, authenticateUser, this.searchController.searchAll)
    this.router.get(`${this.path}/songs`, searchSchema, authenticateUser, this.searchController.searchSongs)
    this.router.get(`${this.path}/albums`, searchSchema, authenticateUser, this.searchController.searchAlbums)
    this.router.get(`${this.path}/playlists`, searchSchema, authenticateUser, this.searchController.searchPlaylists)
    this.router.get(`${this.path}/artists`, searchSchema, authenticateUser, this.searchController.searchArtists)
  }
}
