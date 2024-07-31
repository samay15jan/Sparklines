import React, { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { albumDetails, artistAlbums } from '../../../api/apiMethods'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { AnimatePresence, motion } from 'framer-motion'
const Header = lazy(() => import('./components/Header'))
const PlayIcon = lazy(() => import('./components/PlayIcon'))
const SongList = lazy(() => import('./components/SongList'))
const RelatedContent = lazy(() => import('./components/RelatedContent'))

const Album = () => {
  const [newAlbumDetails, setAlbumsDetails] = useRQGlobalState('albumDetails', null)
  const [newArtistAlbums, setArtistAlbums] = useRQGlobalState('artistAlbums', null)
  const [dominantColor, setDominantColor] = useState()
  const { id } = useParams()

  useEffect(() => {
    getData()
  }, [id])

  async function getData() {
    if (id) {
      const detailsResponse = await albumDetails(id)
      setAlbumsDetails(detailsResponse?.data)
      if (newAlbumDetails.data) {
        const albumsResponse = await artistAlbums(newAlbumDetails?.data?.primaryArtistsId, 1, 'latest')
        setArtistAlbums(albumsResponse?.data)
      }
    }
  }

  function handleDate(date) {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <AnimatePresence>
      <motion.div
        key="album"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={
            dominantColor && {
              backgroundColor: `rgba(${dominantColor}, 0.7)`,
              boxShadow: `0 50px 200px 150px rgba(${dominantColor}, 0.5)`,
            }
          }
        >
          {newAlbumDetails && (
            <div className='relative pt-24 ml-5'>
              <Header
                data={newAlbumDetails}
                image={newAlbumDetails.data?.image[2].link}
                type='Album'
                name={newAlbumDetails.data?.name}
                artistName={newAlbumDetails.data?.primaryArtists}
                year={newAlbumDetails.data?.year}
                songCount={newAlbumDetails.data?.songCount}
                dominantColor={(color) => setDominantColor(color)}
              />
              <PlayIcon songs={newAlbumDetails.data?.songs} />
            </div>
          )}
        </div>
        {
          newAlbumDetails &&
          <SongList
            songs={newAlbumDetails.data?.songs}
            releaseDate={handleDate(newAlbumDetails.data?.songs[0]?.releaseDate)}
            copyright={newAlbumDetails.data?.songs[0]?.copyright}
          />
        }any
        {
          newArtistAlbums &&
          <RelatedContent
            relatedSongs={newArtistAlbums?.data?.results}
            artistName={newAlbumDetails.data?.primaryArtists}
          />
        }
      </motion.div >
    </AnimatePresence >
  )
}

export default Album
