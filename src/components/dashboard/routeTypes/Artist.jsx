import React, { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  artistDetails,
  artistSongs,
  artistAlbums,
  artistRecommendations,
  searchSpecific,
} from '../../../api/apiMethods'
import PlayIcon from './components/PlayIcon'
import SongList from './components/SongList'
import useRQGlobalState from '../../../utils/useRQGlobalState'
const Header = lazy(() => import('./components/Header'))
const RelatedContent = lazy(() => import('./components/RelatedContent'))

const artist = () => {
  const [artistData, setArtistData] = useRQGlobalState('artistData', null)
  const [dominantColor, setDominantColor] = useState()
  const { id } = useParams()

  useEffect(() => {
    getData()
  }, [id])

  const addArtistData = (newKey, newData) => {
    setArtistData(prevState => ({
      ...prevState,
      [newKey]: newData
    }))
  }

  async function getData() {
    if (id) {
      const artistResponse = await artistDetails(id)
      const artistId = artistResponse?.data?.id
      const artistName = artistResponse?.data?.name.replace(' ', '+')
      let songId
      addArtistData('artistDetails', artistResponse?.data)
      if (artistId) {
        const songsResponse = await artistSongs(artistId)
        addArtistData('artistSongs', songsResponse?.data)
        songId = songsResponse?.data?.results[0]
      }
      if (artistId) {
        const albumsResponse = await artistAlbums(artistId)
        addArtistData('artistAlbums', albumsResponse?.data)
      }
      // TODO FIX 
      // if (artistName) {
      //   const songs = await searchSpecific('songs', artistName)
      //   const albums = await searchSpecific('albums', artistName)
      //   const artists = await searchSpecific('artists', artistName)
      //   const playlists = await searchSpecific('playlists', artistName)
      //   const searchResponse = {
      //     'songs': songs || null,
      //     'albums': albums || null,
      //     'artists': artists || null,
      //     'playlists': playlists|| null,
      // }
      // addArtistData('artistSearches', searchResponse)
      // }
      // if (artistId && songId) {
      //   const albumsResponse = await artistRecommendations(artistId, songId)
      //   addArtistData('artistRecommendations', albumsResponse?.data)
      // }
    }
  }

  return (
    <div>
      <div
        style={
          dominantColor && {
            backgroundColor: `rgba(${dominantColor}, 0.7)`,
            boxShadow: `0 50px 200px 150px rgba(${dominantColor}, 0.5)`,
          }
        }
      >
        {artistData?.data?.artistDetails && (
          <div className='relative pt-20 ml-5'>
            <Header
              data={artistData?.data?.artistDetails}
              image={artistData?.data?.artistDetails?.image[2].link}
              name={artistData?.data?.artistDetails?.name}
              followerCount={artistData?.data?.artistDetails?.followerCount}
              dominantColor={(color) => setDominantColor(color)}
              verfied={artistData?.data?.artistDetails?.isVerified}
            />
            <PlayIcon />
          </div>
        )}
      </div>
      {artistData?.data?.artistSongs &&
        <SongList
          songs={artistData?.data?.artistSongs?.results?.slice(0, 5)}
          type='artist'
        />
      }
      <div>
        {artistData?.data?.artistAlbums &&
          <RelatedContent
            relatedSongs={artistData?.data?.artistAlbums?.results.slice(0, 4)}
            heading='Appears On'
          />
        }
      </div>
    </div>
  )
}

export default artist
