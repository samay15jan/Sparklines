import 'dotenv/config'
import { App } from '../src/app'
import { UserRoute } from '../src/routes/user.route'
import { AuthRoute } from '../src/routes/auth.route'
import { ApiRoute } from '../src/routes/api.route'
import { AlbumsRoute } from '../src/routes/albums.route'
import { SongsRoute } from '../src/routes/songs.route'
import { SearchRoute } from '../src/routes/search.route'
import { PlaylistsRoute } from '../src/routes/playlists.route'
import { ArtistsRoute } from '../src/routes/artists.route'
import { HomeRoute } from '../src/routes/home.route'
import { LyricsRoute } from '../src/routes/lyrics.route'
import { ModulesRoute } from '../src/routes/modules.route'

const app = new App([
  new HomeRoute(),
  new SearchRoute(),
  new SongsRoute(),
  new AlbumsRoute(),
  new ArtistsRoute(),
  new PlaylistsRoute(),
  new LyricsRoute(),
  new ModulesRoute(),
  new AuthRoute(),
  new UserRoute(),
  new ApiRoute(),
])

export default app.getServer()
