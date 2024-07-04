import React, { lazy } from 'react'
const Homepage = lazy(() => import('../homepage/Homepage'))
const Search = lazy(() => import('../searchMenu/Search'))
const Playlist = lazy(() => import('../routeTypes/Playlist'))
const Track = lazy(() => import('../routeTypes/Track'))
const Album = lazy(() => import('../routeTypes/Album'))
const Artist = lazy(() => import('../routeTypes/Artist'))

const MainScreen = ({ showMenu }) => {
  return (
    <div className='bg-[#0f0f0f] overflow-y-auto h-auto my-2 mx-1 rounded-lg col-span-8'>
      {showMenu === 'search' && <Search />}
      {showMenu === 'home' && <Homepage />}
      {showMenu === 'playlist' && <Playlist />}
      {showMenu === 'track' && <Track />}
      {showMenu === 'album' && <Album />}
      {showMenu === 'artist' && <Artist />}
    </div>
  )
}

export default MainScreen
