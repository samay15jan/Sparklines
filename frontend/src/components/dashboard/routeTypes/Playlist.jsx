import { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { playlistDetails } from '../../../api/apiMethods'
import useRQGlobalState from '../../../utils/useRQGlobalState'
import { AnimatePresence, motion } from 'framer-motion'
const Header = lazy(() => import('./components/Header'))
const PlayIcon = lazy(() => import('./components/PlayIcon'))
const SongList = lazy(() => import('./components/SongList'))

const Playlist = () => {
  const [newPlaylistDetails, setPlaylistDetails] = useRQGlobalState(
    'playlistDetail',
    null
  )
  const [dominantColor, setDominantColor] = useState()
  const { id } = useParams()

  useEffect(() => {
    getData()
  }, [id])

  async function getData() {
    if (id) {
      const detailsResponse = await playlistDetails(id)
      setPlaylistDetails(detailsResponse?.data)
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
        key='playlist'
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
          {newPlaylistDetails && (
            <div className='relative pt-24 ml-5'>
              <Header
                data={newPlaylistDetails}
                image={newPlaylistDetails.data?.image[2].link}
                type='Playlist'
                name={newPlaylistDetails.data?.name}
                artistName={newPlaylistDetails.data?.firstname || 'Sparklines'}
                year={newPlaylistDetails.data?.year || '2024'}
                songCount={newPlaylistDetails.data?.songCount}
                dominantColor={(color) => setDominantColor(color)}
              />
              <PlayIcon songs={newPlaylistDetails.data?.songs} />
            </div>
          )}
        </div>
        {newPlaylistDetails && (
          <SongList
            songs={newPlaylistDetails.data?.songs}
            releaseDate={handleDate(
              newPlaylistDetails.data?.songs[0]?.releaseDate
            )}
            copyright={newPlaylistDetails.data?.songs[0]?.copyright}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Playlist
