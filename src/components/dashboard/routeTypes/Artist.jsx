import React, { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  artistDetails,
  artistSongs,
  artistAlbums,
  artistRecommendations,
} from '../../../api/apiMethods'
import PlayIcon from './components/PlayIcon'
import useRQGlobalState from '../../../utils/useRQGlobalState'
const Header = lazy(() => import('./components/Header'))
const RelatedContent = lazy(() => import('./components/RelatedContent'))

const artist = () => {
  const [newArtistData, setArtistData] = useRQGlobalState('artistData', null)
  const [relatedSongs, setRelatedSongs] = useRQGlobalState('artistSongs', null)
  const [newArtistAlbums, setArtistAlbums] = useRQGlobalState('artistAlbums', null)
  const [dominantColor, setDominantColor] = useState()
  const { id } = useParams()

  useEffect(() => {
    getData()
  }, [id])

  async function getData() {
    if (id) {
      const detailsResponse = await artistDetails(id)
      setArtistData(detailsResponse?.data)
      if (newArtistData?.data) {
        const albumsResponse = await artistSongs(newArtistData?.data?.id, 1, 'latest')
        setRelatedSongs(albumsResponse?.data)
        console.log(albumsResponse?.data)
      }
      if (newArtistData.data) {
        const albumsResponse = await artistAlbums(newArtistData?.data?.id, 1)
        setArtistAlbums(albumsResponse?.data)
      }
    }
  }
console.log(newArtistAlbums?.data?.results)
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
        {newArtistData && (
          <div className='relative pt-24 ml-5'>
            <Header
              data={newArtistData}
              image={newArtistData.data?.image[2].link}
              name={newArtistData.data?.name}
              followerCount={newArtistData.data?.followerCount}
              dominantColor={(color) => setDominantColor(color)}
            />
            <PlayIcon />
          </div>
        )}
      </div>
      <div className='pt-20'>
        {newArtistAlbums &&
          <RelatedContent
            relatedSongs={newArtistAlbums?.data?.results}
            artistName='Appears On'
          />
        }
      </div>
      {relatedSongs &&
        <RelatedContent
          relatedSongs={relatedSongs.data?.results}
          artistName='songs'
        />
      }
    </div>
  )
}

export default artist
