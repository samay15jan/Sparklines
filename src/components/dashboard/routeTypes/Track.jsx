import { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { songDetails, artistSongs } from '../../../api/apiMethods'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { AnimatePresence, motion } from 'framer-motion'
const Header = lazy(() => import('./components/Header'))
const PlayIcon = lazy(() => import('./components/PlayIcon'))
const SongList = lazy(() => import('./components/SongList'))
const RelatedContent = lazy(() => import('./components/RelatedContent'))

const Track = () => {
  const [songData, setSongData] = useRQGlobalState('songDetails', null)
  const [relatedSongs, setRelatedSongs] = useRQGlobalState('artistSongs', null)
  const { id } = useParams()
  const [dominantColor, setDominantColor] = useState()

  useEffect(() => {
    getData()
  }, [id])

  async function getData() {
    if (id) {
      const response = await songDetails(id)
      setSongData(response?.data)
      if (songData?.data) {
        const artistsId = songData?.data[0]?.primaryArtistsId?.split(',')
        const albumsResponse = await artistSongs(artistsId[0], 1, 'latest')
        setRelatedSongs(albumsResponse?.data)
      }
    }
  }

  function formatTime(time, type) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    if (type == 1) {
      return `${minutes} min ${seconds.toString().padStart(2, '0')} sec`
    }
    if (type == 2) {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  }

  function handleDate(date) {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  function artistNames(artists) {
    return artists.replaceAll(',', ' \u25CF')
  }

  return (
    <AnimatePresence>
      <motion.div
        key='track'
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
          {songData?.data && (
            <div className='relative pt-24 ml-5'>
              <Header
                data={songData}
                image={songData.data[0]?.image[2].link}
                type='Single'
                name={songData.data[0]?.name}
                artistName={artistNames(songData.data[0]?.primaryArtists)}
                year={songData.data[0]?.year}
                time={formatTime(songData.data[0]?.duration, 1)}
                dominantColor={(color) => setDominantColor(color)}
              />
              <PlayIcon id={songData.data[0]?.id} />
            </div>
          )}
        </div>
        {songData?.data && (
          <SongList
            name={songData.data[0]?.name}
            artistName={songData.data[0]?.primaryArtists}
            time={formatTime(songData.data[0]?.duration, 2)}
            releaseDate={handleDate(songData.data[0]?.releaseDate)}
            copyright={songData.data[0]?.copyright}
            explicit={songData.data[0]?.explicitContent}
            id={songData.data[0]?.id}
          />
        )}
        {relatedSongs && (
          <RelatedContent
            relatedSongs={relatedSongs.data?.results}
            artistName={relatedSongs.data?.primaryArtists}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Track
