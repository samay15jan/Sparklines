import React, { lazy } from 'react'
const Playlist = lazy(() => import('./Playlist'))
const Artist = lazy(() => import('./Artist'))
const Track = lazy(() => import('./Track'))
const Album = lazy(() => import('./Album'))

const RouteType = ({ type }) => {
  return (
    <div>
      { type === 'playlist' && <Playlist /> }
      { type === 'artist' && <Artist /> }
      { type === 'track' && <Track /> }
      { type === 'album' && <Album /> }
    </div>
  )
}

export default RouteType