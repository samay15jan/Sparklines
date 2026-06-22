import { lazy } from 'react'
import Header from '../header/Header'
const Homepage = lazy(() => import('../homepage/Homepage'))
const Search = lazy(() => import('../searchMenu/Search'))
const Playlist = lazy(() => import('../routeTypes/Playlist'))
const Track = lazy(() => import('../routeTypes/Track'))
const Album = lazy(() => import('../routeTypes/Album'))
const Artist = lazy(() => import('../routeTypes/Artist'))
const RecentlyPlayed = lazy(() => import('../routeTypes/RecentlyPlayed'))
const Discography = lazy(() => import('../routeTypes/components/Discography'))
const LikedSongs = lazy(() => import('../routeTypes/LikedSongs'))
const Playlists = lazy(() => import('../routeTypes/Playlists'))

const MainScreen = ({ showMenu, onOpenArtistsPanel }) => {
  return (
    <div className='w-full overflow-y-auto bg-[#0f0f0f] h-[calc(100vh-8rem)] lg:h-[calc(100vh-5rem)] my-2 mx-1 rounded-lg lg:col-span-8'>
      <div className='relative '>
        <Header onOpenArtistsPanel={onOpenArtistsPanel} />
      </div>
      {showMenu === 'search' && <Search />}
      {showMenu === 'home' && <Homepage />}
      {showMenu === 'playlist' && <Playlist />}
      {showMenu === 'track' && <Track />}
      {showMenu === 'album' && <Album />}
      {showMenu === 'artist' && <Artist />}
      {showMenu === 'artist-discography' && <Discography />}
      {showMenu === 'recently-played' && <RecentlyPlayed />}
      {showMenu === 'liked' && <LikedSongs />}
      {showMenu === 'playlists' && <Playlists />}
    </div>
  )
}

export default MainScreen
