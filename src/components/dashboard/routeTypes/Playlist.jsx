import React, { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { playlistDetails } from '../../../api/apiMethods'
const Header = lazy(() => import('./components/Header'))
const PlayIcon = lazy(() => import('./components/PlayIcon'))
const SongList = lazy(() => import('./components/SongList'))

const Playlist = () => {
  const [data, setData] = useState()
  const [dominantColor, setDominantColor] = useState()
  const { id } = useParams()

  useEffect(() => {
    getData()
  }, [id])

  async function getData() {
    if (id) {
      const response = await playlistDetails(id)
      setData(response)
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
    <div>
      <div
        style={
          dominantColor && {
            backgroundColor: `rgba(${dominantColor}, 0.7)`,
            boxShadow: `0 50px 200px 150px rgba(${dominantColor}, 0.5)`,
          }
        }
      >
        {data && (
          <div className='relative pt-24 ml-5'>
            <Header
              data={data}
              image={data.data?.image[2].link}
              type='Playlist'
              name={data.data?.name}
              artistName={data.data?.firstname || 'Sparklines'}
              year={data.data?.year || '2024'}
              songCount={data.data?.songCount}
              dominantColor={(color) => setDominantColor(color)}
            />
            <PlayIcon />
          </div>
        )}
      </div>
      {data &&
        <SongList
          songs={data.data?.songs}
          releaseDate={handleDate(data.data?.songs[0]?.releaseDate)}
          copyright={data.data?.songs[0]?.copyright}
        />
      }
    </div>
  )
}

export default Playlist
